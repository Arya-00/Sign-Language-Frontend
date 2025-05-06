import { inject, Injectable, signal } from '@angular/core';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenAI } from "@google/genai";
import { HistoryService } from './history.service';
import { Router } from '@angular/router';
import { ImageResult, VideoResult } from '../interfaces/interfaceUtil';

@Injectable({
	providedIn: 'root'
})
export class GeminiService {
	historyService = inject(HistoryService);
	router = inject(Router);
	private genAI = new GoogleGenerativeAI('AIzaSyB_m8Z-Y6M7fdFU2jmo1WxPHdoGJd9Zj8g');
	public imageSource = signal<string | ArrayBuffer | null>('');
	public source = signal<string | null>('');
	public result = signal<ImageResult['details']>({
		language: '',
		symbol: '',
		description: ''
	});
	public videoResult = signal<VideoResult>({
		language: {
			name: '',
			confidence: ''
		},
		signs: [],
		description: ''
	});

	async run(base64Image: string, mimeType: string) {
		const model = this.genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

		const prompt = `
		Identify any sign language symbol in the image.
		Return only this JSON format — no markdown, no explanation, no extra text:
		{
			"language": "string or null",
			"symbol": "string or null",
			"description": "string"
		}
		Example:
		{"language": "ASL", "symbol": "Hello", "description": "A person holding their hand up in the ASL 'hello' gesture."}
		If no symbol is found, return:
		{"language": null, "symbol": null, "description": "Description of the image here."}
		`;

		const imagePart = {
			inlineData: {
				data: base64Image,
				mimeType
			}
		};

		const generatedContent = await model.generateContent([prompt, imagePart]);
		const rawText = generatedContent.response.candidates?.[0].content.parts[0].text;
		const cleanedJson = rawText?.replace(/```json|```/g, '').trim();

		if (cleanedJson) {
			const parsedJSON: ImageResult["details"] = JSON.parse(cleanedJson);
			if (!parsedJSON.language) parsedJSON.language = "No Sign Language Identified";
			if (!parsedJSON.symbol) parsedJSON.symbol = "No Sign Language Symbol Identified";
			if (!parsedJSON.description) parsedJSON.description = "No Sign Language Description";
			this.result.set(parsedJSON);
			console.log('✅ Parsed Result:', this.result());
			const key = `chat${Date.now()}`;
			const value: ImageResult["details"] = { ...parsedJSON };
			this.historyService.setItem(key, value);
		} else {
			console.error('❌ Failed to parse JSON:');
		}
	}
}
