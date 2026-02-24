import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // 1. Import the Router

@Component({
  selector: 'app-suggestion-form',
  templateUrl: './suggestion-form.component.html',
  styleUrls: ['./suggestion-form.component.css']
})
export class SuggestionFormComponent implements OnInit {
  suggestionForm!: FormGroup;

  categories: string[] = [
    'Infrastructure et bâtiments',
    'Technologie et services numériques',
    'Restauration et cafétéria',
    'Hygiène et environnement',
    'Transport et mobilité',
    'Activités et événements',
    'Sécurité',
    'Communication interne',
    'Accessibilité',
    'Autre'
  ];

  // 2. Inject Router alongside FormBuilder
  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    const today = new Date().toLocaleDateString('fr-FR');

    this.suggestionForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^[A-Z][a-zA-Z]*$')]],
      description: ['', [Validators.required, Validators.minLength(30)]],
      category: ['', Validators.required],
      date: [today],
      status: ['en attente']
    });
  }

  // 3. The Submit Method
  onSubmit() {
    // Double check that the form is valid just to be safe
    if (this.suggestionForm.valid) {

      // Extract the values from the form
      const formValues = this.suggestionForm.value;

      // Create the final Suggestion object
      const newSuggestion = {
        ...formValues,
        id: Math.floor(Math.random() * 1000), // Simulating an auto-increment ID for now
        nbLikes: 0 // Default value as requested in the workshop
      };

      console.log('Nouvelle suggestion ajoutée :', newSuggestion);

      // TODO: If you have a SuggestionService, you would call it here to save the data!
      // Example: this.suggestionService.addSuggestion(newSuggestion);

      // 4. Redirect the user back to the list
      this.router.navigate(['/suggestions']);
    }
  }
}
