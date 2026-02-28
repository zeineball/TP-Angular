import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {HomeComponent} from './core/home/home.component';
import {NotfoundComponent} from './core/notfound/notfound.component';
import {SuggestionFormComponent} from './features/suggestions/suggestion-form/suggestion-form.component';

const routes: Routes = [
  // Default route → list-suggestion
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  // Route for the component
  {path: 'home', component: HomeComponent},

  { path: 'suggestions', loadChildren: () => import('./features/suggestions/suggestions.module').then(m => m.SuggestionsModule) },

  // Optional: 404
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
