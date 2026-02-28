import {Component, OnInit} from '@angular/core';
import { Suggestion } from '../../../models/suggestion'
import {SuggestionFormComponent} from '../suggestion-form/suggestion-form.component';
import {SuggestionService} from '../../../core/services/suggestion.service';
@Component({
  selector: 'app-list-suggestion',
  templateUrl: './list-suggestion.component.html',
  styleUrls: ['./list-suggestion.component.css']
})
export class ListSuggestionComponent implements OnInit{

  suggestions: Suggestion[] = [];
  favorites: Suggestion[] = [];

  ngOnInit(): void {
      this.suggestionService.getSuggestionsList().subscribe({
        next: data =>{
          this.suggestions = data;
          console.log('suggestions loaded', data);
        },
        error: (err) => {
          console.error('error loading list', err);
        }
      })
  }

  constructor(private suggestionService: SuggestionService) {
  }

  like(s: Suggestion) {
    s.nbLikes++;
  }

  addToFavorites(s: Suggestion) {
    if (!this.favorites.includes(s)) {
      this.favorites.push(s);
    }
  }

  searchText: string = '';

  filteredSuggestions(): Suggestion[] {
    return this.suggestions.filter(s =>
      s.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
      s.category.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }


  // Méthode pour obtenir les classes CSS selon le statut
  getStatusClass(status: string): string {
    switch (status) {
      case 'acceptee': return 'status-accepted';
      case 'refusee': return 'status-rejected';
      case 'en_attente': return 'status-pending';
      default: return '';
    }
  }

  // Méthode pour incrémenter les likes
  likeSuggestion(suggestion: Suggestion): void {
    this.suggestionService.incrementLikes(suggestion).subscribe({
      next: () => {
        suggestion.nbLikes++;
        console.log('like saved, new total : ', suggestion.nbLikes);
      },
      error: (err: any) =>{
        console.error('error adding  like',err);
    }
    });
  }

  protected readonly SuggestionFormComponent = SuggestionFormComponent;
}
