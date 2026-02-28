import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Suggestion} from '../../../models/suggestion';
import {SuggestionService} from '../../../core/services/suggestion.service';
@Component({
  selector: 'app-suggestion-details',
  templateUrl: './suggestion-details.component.html',
  styleUrl: './suggestion-details.component.css'
})
export class SuggestionDetailsComponent implements OnInit{
  suggestion: Suggestion | undefined;

  // 2. Inject the service into the constructor
  constructor(private route: ActivatedRoute,
              private router: Router,
              private suggestionService: SuggestionService) { }
    ngOnInit(): void {
      // 3. Extract the 'id' parameter from the URL when the component loads
      const idParam = this.route.snapshot.paramMap.get('id');
      const id = Number(idParam);

      this.suggestionService.getSuggestionsList().subscribe({
        next: (data: Suggestion[]) => {
          this.suggestion = data.find((s: Suggestion )=> s.id === id);
        },
        error: (err) =>{
          console.error("Error loading list", err);
        }
      });
    }

    delete(){
    if (this.suggestion && confirm('Voulez-vous vraiment supprimer cette suggestion ?')){
      this.suggestionService.deleteSuggestion(this.suggestion.id).subscribe({
        next: () => {
          console.log('Suggestion deleted successfully !');
          this.router.navigate(['/suggestions']);
        },
        error: (err: any)=>{
          console.error('Error deleting :', err);
        }
      });
    }
    }

}
