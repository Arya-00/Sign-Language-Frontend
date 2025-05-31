import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ThemeService } from '../../services/theme.service';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';

@Component({
	selector: 'navbar',
	imports: [MatButtonModule, MatIconModule, RouterModule, MatMenuModule],
	templateUrl: './navbar.component.html',
	styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
	protected themeService = inject(ThemeService);
	protected router = inject(Router);
	protected nav = signal<string>('/');

	constructor() {
		this.router.events.subscribe(event => {
		  if (event instanceof NavigationEnd) {
			const baseUrl = event.url.split('?')[0];
			this.nav.set(baseUrl);
		  }
		});
	  }

	protected navigations: Record<string, { link: string; icon: string }> = {
		'/': {
			link: '',
			icon: 'account_circle'
		},
		'/upload': {
			link: '',
			icon: 'arrow_back_ios'
		},
		'/chat': {
			link: '/upload',
			icon: 'arrow_back_ios'
		},
		'/history': {
			link: '/',
			icon: 'arrow_back_ios'
		},
		'/learn': {
			link: '',
			icon: 'arrow_back_ios'
		},
		'/show': {
			link: '',
			icon: 'arrow_back_ios'
		}
	}

}
