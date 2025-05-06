import { Component, inject } from '@angular/core';
import { History } from '../../interfaces/interfaceUtil';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'dialogbox',
	imports: [
		FormsModule,
		MatButtonModule,
		MatDialogTitle,
		MatDialogContent,
		MatDialogActions,
		MatDialogClose,
	  ],
	templateUrl: './dialogbox.component.html',
	styleUrl: './dialogbox.component.scss'
})
export class DialogboxComponent {
	public data: History = inject(MAT_DIALOG_DATA);
	protected formattedDate = '';
	constructor() {
		const timestamp = Number(this.data.chat.replace('chat', ''));
		const date = new Date(timestamp);
		this.formattedDate = date.toLocaleString();
	}
}
