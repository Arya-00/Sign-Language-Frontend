import { Component, inject, signal } from '@angular/core';
import { HistoryService } from '../../services/history.service';
import { History } from '../../interfaces/interfaceUtil';
import { MatIconModule } from '@angular/material/icon';
import { DialogboxComponent } from '../dialogbox/dialogbox.component';
import {
	MAT_DIALOG_DATA,
	MatDialog,
	MatDialogActions,
	MatDialogClose,
	MatDialogContent,
	MatDialogRef,
	MatDialogTitle,
  } from '@angular/material/dialog';

@Component({
	selector: 'history',
	imports: [MatIconModule],
	templateUrl: './history.component.html',
	styleUrl: './history.component.scss'
})
export class HistoryComponent {
	historyService = inject(HistoryService);
	dialog = inject(MatDialog);

	public chatHistory = signal<History[]>([]);
	ngOnInit() {
		this.chatHistory.set(this.historyService.getAllItems());
	}
	protected truncate(text: string, limit: number = 8): string {
		return text.length > limit ? text.slice(0, limit).toUpperCase() + '…' : text.toUpperCase();
	}

	public openDialog(item: History) {
		this.dialog.open(DialogboxComponent, {
			data: item
		});
	}

	protected deleteItem(event: MouseEvent, chat: string) {
		this.historyService.removeItem(chat);
		this.chatHistory.set(this.historyService.getAllItems());
		event.stopPropagation();
	}
}
