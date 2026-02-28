import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; // Import ActivatedRoute
import { SuggestionService } from '../../../core/services/suggestion.service';
import { Suggestion } from '../../../models/suggestion';

@Component({
  selector: 'app-suggestion-form',
  templateUrl: './suggestion-form.component.html',
  styleUrls: ['./suggestion-form.component.css']
})
export class SuggestionFormComponent implements OnInit {
  suggestionForm!: FormGroup;
  idToUpdate: number | null = null; // Track if we are in "Edit" mode

  categories: string[] = [
    'Infrastructure et bâtiments', 'Technologie et services numériques',
    'Restauration et cafétéria', 'Hygiène et environnement',
    'Transport et mobilité', 'Activités et événements',
    'Sécurité', 'Communication interne', 'Accessibilité', 'Autre'
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute, // Inject ActivatedRoute
    private suggestionService: SuggestionService
  ) { }

  ngOnInit(): void {
    const today = new Date().toLocaleDateString('fr-FR');

    // 1. Initialize the empty form
    this.suggestionForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^[A-Z][a-zA-Z]*$')]],
      description: ['', [Validators.required, Validators.minLength(30)]],
      category: ['', Validators.required],
      date: [today],
      status: ['en attente']
    });

    // 2. Check for the ID in the URL
    const idParam = this.route.snapshot.paramMap.get('id');
    console.log('1. ID from URL is:', idParam); // <-- DEBUG LOG 1

    if (idParam) {
      this.idToUpdate = Number(idParam);

      this.suggestionService.getSuggestionById(this.idToUpdate).subscribe({
        next: (data: any) => {
          console.log('Data from backend:', data);

          // THE FIX: Extract the nested 'suggestion' object from the response
          const suggestionToEdit = data.suggestion ? data.suggestion : data;

          // Now patchValue gets exactly what it needs! {title: '...', description: '...'}
          this.suggestionForm.patchValue(suggestionToEdit);
        },
        error: (err: any) => console.error('Erreur de récupération:', err)
      });
    }
  }

  onSubmit() {
    if (this.suggestionForm.valid) {
      const formValues = this.suggestionForm.value;
      const suggestionData = { ...formValues, nbLikes: 0 };

      if (this.idToUpdate) {
        // We are in EDIT mode -> PUT request
        this.suggestionService.updateSuggestion(this.idToUpdate, suggestionData).subscribe({
          next: () => {
            console.log('Updated Successfully !');
            this.router.navigate(['/suggestions']);
          },
          error: (err: any) => console.error('Error updating:', err)
        });
      } else {
        // We are in ADD mode -> POST request
        this.suggestionService.addSuggestion(suggestionData).subscribe({
          next: () => {
            console.log('add suggestion successfully !');
            this.router.navigate(['/suggestions']);
          },
          error: (err: any) => console.error('Error adding:', err)
        });
      }
    }
  }
}
