import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  @Output() searchChange = new EventEmitter<string>();

  searchTerm = '';

  // Subject pour implémenter le debounce
  private searchSubject = new Subject<string>();

  constructor() {
    // Configuration du debounce pour la recherche
    this.searchSubject.pipe(
      debounceTime(300), // Attend 300ms après la dernière frappe
      distinctUntilChanged() // Évite les recherches en double
    ).subscribe(term => {
      this.searchChange.emit(term);
    });
  }

  /**
   * Gère les changements dans le champ de recherche
   */
  onSearchChange(term: string): void {
    this.searchTerm = term;
    this.searchSubject.next(term);
  }
}
