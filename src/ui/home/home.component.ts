import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'app-home',
	imports: [MatIconModule, MatButtonModule, CommonModule, RouterModule],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss'
})
export class HomeComponent {
	protected links = [
		{ id: 1, path: '/upload' },
		{ id: 2, path: '/upload', queryParams: { source: 'video' }},
		{ id: 3, path: '/learn' }
	];
	themeService = inject(ThemeService);
}
