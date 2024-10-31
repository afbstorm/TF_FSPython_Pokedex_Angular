import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonBasic, PokemonDetail } from '../../models/pokemons.models';
import { PokemonsService } from '../../services/pokemons.service';
import { SearchComponent } from '../search/search.component';
import { DetailsComponent } from '../details/details.component';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  // En standalone les éléments a utiliser en HTML sont injectés dans le tableau d'import du decorator
  imports: [CommonModule, SearchComponent, DetailsComponent],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css'
})
export class PokemonListComponent {

  constructor(private _pokeService: PokemonsService) {
  }

  pokemons: PokemonBasic[] = [];
  selectedPokemon: PokemonDetail | null = null;

  currentPage = 0;
  pageSize = 20;
  hasNextPage = true;

  ngOnInit(): void {
    this.loadPokemons();
  }

  /**
   * Charge la liste des Pokémon pour la page courante
   */
  loadPokemons(): void {
    this._pokeService.getPokemons(this.currentPage * this.pageSize, this.pageSize)
      .subscribe(data => {
        this.pokemons = data.results;
        this.hasNextPage = !!data.next;
      });
  }

  /**
   * Charge les détails d'un Pokémon spécifique
   * @param {PokemonBasic} pokemon - Les infos pokémons de base
   */
  loadPokemonDetail(pokemon: PokemonBasic): void {
    const id = pokemon.url.split('/').slice(-2, -1)[0];
    this._pokeService.getPokemonDetail(id).subscribe(
      detail => this.selectedPokemon = detail
    );
  }

  /**
   * Génère l'URL de l'image d'un Pokémon
   * @param {PokemonBasic} pokemon - Les infos pokémons de base
   */
  getPokemonImage(pokemon: PokemonBasic): string {
    const id = pokemon.url.split('/').slice(-2, -1)[0];
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  }

  nextPage(): void {
    if (this.hasNextPage) {
      this.currentPage++;
      this.loadPokemons();
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadPokemons();
    }
  }

  /**
   * Gère la recherche de Pokémon
   * @param {string} searchTerm - Recherche d'un pokémon par son nom
   */
  onSearch(searchTerm: string): void {
    if (searchTerm) {
      this._pokeService.searchPokemons(searchTerm).subscribe(
        data => this.pokemons = data.results
      );
    } else {
      this.loadPokemons();
    }
  }
}
