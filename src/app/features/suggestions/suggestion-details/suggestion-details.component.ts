import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-suggestion-details',
  templateUrl: './suggestion-details.component.html',
  styleUrl: './suggestion-details.component.css'
})
export class SuggestionDetailsComponent implements OnInit{
  // Variable to hold the ID we grab from the URL
  suggestionId: string | null = '';

  // 2. Inject the service into the constructor
  constructor(private route: ActivatedRoute) { }
    ngOnInit(): void {
      // 3. Extract the 'id' parameter from the URL when the component loads
      this.suggestionId = this.route.snapshot.paramMap.get('id');
    }

}
