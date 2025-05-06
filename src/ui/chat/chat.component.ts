import { Component, inject, Input } from '@angular/core';
import { GeminiService } from '../../services/gemini.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
	selector: 'chat',
	imports: [MatIconModule],
	templateUrl: './chat.component.html',
	styleUrl: './chat.component.scss'
})
export class ChatComponent {
	@Input() imageSource: string | ArrayBuffer | null = null;
	protected geminiService = inject(GeminiService);

	constructor() {}
}
