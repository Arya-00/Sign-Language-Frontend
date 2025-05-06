import { Injectable, signal } from '@angular/core';
import { History, ImageResult } from '../interfaces/interfaceUtil';

@Injectable({
	providedIn: 'root'
})
export class HistoryService {
	public setItem(key: string, value: any): void {
		sessionStorage.setItem(key, JSON.stringify(value));
	}

	public getItem(key: string) {
		const item = sessionStorage.getItem(key);
		return item ? JSON.parse(item): null;
	}

	public removeItem(key: string): void {
		sessionStorage.removeItem(key);
	}

	public clear(): void {
		sessionStorage.clear();
	}

	public getAllItems(): History[] {
		const items: History[] = [];
	
		for (let i = 0; i < sessionStorage.length; i++) {
			const key = sessionStorage.key(i)!;
			const raw = sessionStorage.getItem(key);
	
			if (!raw) continue;
	
			try {
				const value = JSON.parse(raw);
				items.push({ chat: key, details: value });
			} catch {}
		}
	
		return items;
	}
	
}

