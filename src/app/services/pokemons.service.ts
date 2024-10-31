import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import {PokemonDetail, PokemonList } from '../models/pokemons.models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {
  private readonly baseUrl = 'https://pokeapi.co/api/v2';

  constructor(private _http: HttpClient) {
  }

  /**
   * Récupère une liste paginée de Pokémon
   * @param {number} offset Position de départ pour la pagination
   * @param {number} limit Nombre de Pokémon par page
   */
  getPokemons(offset: number = 0, limit: number = 20): Observable<PokemonList> {
    return this._http.get<PokemonList>(
      `${this.baseUrl}/pokemon?offset=${offset}&limit=${limit}`
    );
  }

  /**
   * Récupère les détails d'un Pokémon spécifique
   * @param {string | number} id Identifiant ou nom du Pokémon
   */
  getPokemonDetail(id: string | number): Observable<PokemonDetail> {
    return this._http.get<PokemonDetail>(`${this.baseUrl}/pokemon/${id}`);
  }

  /**
   * Recherche des Pokémon par nom
   * @param {string} name Nom du Pokémon à rechercher
   */
  searchPokemons(name: string): Observable<PokemonList> {
    return this.getPokemons(0, 1000).pipe(
      map(list => ({
        ...list,
        results: list.results.filter(pokemon =>
          pokemon.name.toLowerCase().includes(name.toLowerCase())
        )
      }))
    );
  }
}
