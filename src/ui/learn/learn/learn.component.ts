import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { DictionaryComponent } from "../dictionary/dictionary.component";
import { TutorialComponent } from "../tutorial/tutorial.component";

@Component({
  selector: 'app-learn',
  imports: [MatTabsModule, DictionaryComponent, TutorialComponent],
  templateUrl: './learn.component.html',
  styleUrl: './learn.component.scss'
})
export class LearnComponent {

}
