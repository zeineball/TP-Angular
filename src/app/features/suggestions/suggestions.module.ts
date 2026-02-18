import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuggestionsRoutingModule } from './suggestions-routing.module';
import { SuggestionsComponent } from './suggestions.component';
import {ListSuggestionComponent} from './list-suggestion/list-suggestion.component';
import { SuggestionDetailsComponent } from './suggestion-details/suggestion-details.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    SuggestionsComponent,
    ListSuggestionComponent,
    SuggestionDetailsComponent,
  ],
  imports: [
    CommonModule,
    SuggestionsRoutingModule,
    FormsModule
  ]
})
export class SuggestionsModule { }
