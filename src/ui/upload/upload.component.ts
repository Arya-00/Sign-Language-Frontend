import { Component, inject } from '@angular/core';
import { GeminiService } from '../../services/gemini.service';
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SnackBarService } from '../../services/snack-bar.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ChatComponent } from "../chat/chat.component";
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { VideoResult } from '../../interfaces/interfaceUtil';
import { HistoryService } from '../../services/history.service';

@Component({
	selector: 'upload',
	imports: [CommonModule, MatRippleModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule, ChatComponent, RouterModule],
	templateUrl: './upload.component.html',
	styleUrl: './upload.component.scss'
})
export class UploadComponent {
	private geminiService = inject(GeminiService);
	private route = inject(ActivatedRoute);
	private snackBar = inject(SnackBarService);
	private http = inject(HttpClient);
	protected imageSrc: string | ArrayBuffer | null = '/images/icon2.webp';
	private base64String: string = '';
	private file: Blob = new Blob();
	protected loading = false;
	protected isLoaded = false;
	protected uploaded = false;
	protected source: string | null = '';

	ngOnInit() {
		this.source = this.route.snapshot.queryParamMap.get('source');
		this.geminiService.source.set(this.source);
	}

	onFileSelected(event: Event) {
		const input = event.target as HTMLInputElement;
		if (input.files && input.files.length > 0) {
			this.file = input.files[0];

			const reader = new FileReader();
			reader.onload = () => {
				this.imageSrc = reader.result;
				this.geminiService.imageSource.set(reader.result);
				this.base64String = (reader.result as string).split(',')[1];
			};

			reader.readAsDataURL(this.file);
			this.uploaded = true;
		}
	}

	private uploadVideo(): Promise<void> {
		const formData = new FormData();
		formData.append('file', this.file);
	
		return new Promise((resolve, reject) => {
			this.http.post('http://localhost:5000/video', formData).subscribe({
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
	
	private resetUploadState(): void {
		this.uploaded = false;
		this.imageSrc = '/images/icon2.webp';
		this.loading = false;
	}

	async submit() {
		if (this.imageSrc === '/images/icon2.webp') {
			const mediaType = this.source === 'video' ? 'a video' : 'an image';
			this.snackBar.openSnackBar(`Upload ${mediaType}`, 'OK');
			return;
		}
	
		this.loading = true;
	
		try {
			if (this.source === 'video') {
				const response: VideoResult = await this.uploadVideo() as any as VideoResult;
				this.geminiService.videoResult.set(response);
			} else {
				await this.geminiService.run(this.base64String, this.file.type);
			}
			this.isLoaded = true;
		} catch (error) {
			const mediaType = this.source === 'video' ? 'video' : 'image';
			this.snackBar.openSnackBar(`Failed to process ${mediaType}`, 'Retry');
		} finally {
			this.resetUploadState();
		}
	}
}
