import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common'
import { PokemonDetail } from '../../models/pokemons.models';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  @Input({ required: true }) pokemon!: PokemonDetail;

  @Output() close = new EventEmitter<void>();
}
