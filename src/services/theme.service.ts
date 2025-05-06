import { Injectable, signal } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class ThemeService {
	private darkThemeClass = 'dark-theme';
	private mobileClass = 'mobile';
	private pcClass = 'pc';

	constructor() {
		this.detectPlatform();
		this.loadTheme();
	}

	darkmode = signal(false);
	themeIcon = signal('light-mode');
	isMobile = signal(false);

	toggleTheme(): void {
		document.body.classList.toggle(this.darkThemeClass);
		const isDarkMode = document.body.classList.contains(this.darkThemeClass);
		localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');

		this.darkmode.set(isDarkMode);
		this.themeIcon.set(isDarkMode ? 'light_mode' : 'dark_mode');
		this.applyPlatformTheme();
	}

	private loadTheme(): void {
		const savedTheme = localStorage.getItem('theme') === 'dark';
		if (savedTheme) {
			document.body.classList.add(this.darkThemeClass);
		}
		this.darkmode.set(savedTheme);
		this.themeIcon.set(savedTheme ? 'light_mode' : 'dark_mode');
		this.applyPlatformTheme();
	}

	private detectPlatform(): void {
		const isMobileDevice = window.innerWidth <= 768;
		this.isMobile.set(isMobileDevice);
		window.addEventListener('resize', () => {
			const updatedMobile = window.innerWidth <= 768;
			this.isMobile.set(updatedMobile);
			this.applyPlatformTheme();
		});
		this.applyPlatformTheme();
	}

	applyPlatformTheme(): void {
		document.body.classList.remove(this.mobileClass, this.pcClass);
		const platformClass = this.isMobile() ? 'mobile' : 'pc';
		document.body.classList.add(platformClass);
	}
}