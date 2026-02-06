import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListSuggestionComponent } from './core/list-suggestion/list-suggestion.component';

const routes: Routes = [
  // Default route → list-suggestion
  { path: '', redirectTo: 'list-suggestion', pathMatch: 'full' },

  // Route for the component
  { path: 'list-suggestion', component: ListSuggestionComponent },

  // Optional: 404
  { path: '**', redirectTo: 'list-suggestion' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
