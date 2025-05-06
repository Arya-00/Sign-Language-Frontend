import { Routes } from '@angular/router';
import { HomeComponent } from '../ui/home/home.component';
import { UploadComponent } from '../ui/upload/upload.component';
import { ChatComponent } from '../ui/chat/chat.component';
import { HistoryComponent } from '../ui/history/history.component';

export const routes: Routes = [
	{
		path: '',
		component: HomeComponent
	},
	{
		path: 'upload',
		component: UploadComponent
	},
	{
		path: 'chat',
		component: ChatComponent
	},
	{
		path: 'history',
		component: HistoryComponent
	}
];
