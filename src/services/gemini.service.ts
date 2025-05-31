import { inject, Injectable, signal } from '@angular/core';
import { HistoryService } from './history.service';
import { Router } from '@angular/router';
import { ImageResult, VideoResult } from '../interfaces/interfaceUtil';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class GeminiService {
	historyService = inject(HistoryService);
	router = inject(Router);
	private http = inject(HttpClient);
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

	async geminiUploadImage(file: Blob): Promise<void> {
		const formData = new FormData();
		formData.append('image', file);

		try {
			const response: ImageResult["details"] = await new Promise((resolve, reject) => {
				this.http.post<{ response: ImageResult["details"] }>('https://sign-language-backend-sgvt.onrender.com/image', formData).subscribe({
					next: (res) => {
						console.log('Server response:', res);
						resolve(res.response);
					},
					error: (err) => {
						console.error('Upload error:', err);
						reject(err);
					}
				});
			});

			this.result.set(response);

			const key = `chat${Date.now()}`;
			const value: ImageResult["details"] = { ...response };
			this.historyService.setItem(key, value);

		} catch (error) {
			console.error("An error occurred during image upload:", error);
		}
	}

	geminiUploadVideo(file: Blob): Promise<void> {
		const formData = new FormData();
		formData.append('file', file);

		return new Promise((resolve, reject) => {
			this.http.post('https://sign-language-backend-sgvt.onrender.com/video', formData).subscribe({
				next: (res: any) => {
					console.log('Server response:', res);
					resolve(res.response);
				},
				error: (err) => {
					console.error('Upload error:', err);
					reject(err);
				}
			});
		});
	}
}
