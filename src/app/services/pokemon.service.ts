import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PokemonListResponse {
  count: number;
  next: string;
  previous: string;
  results: Array<{ name: string; url: string }>;
}

export interface PokemonDetails {
  id: number;
  name: string;
  sprites: any;
  types: any[];
  abilities: any[];
  height: number;
  weight: number;
  stats: any[];
  // Adicione outros campos conforme necessário
}

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) { }

  getPokemonList(offset: number = 0, limit: number = 20): Observable<PokemonListResponse> {
    return this.http.get<PokemonListResponse>(`${this.baseUrl}?offset=${offset}&limit=${limit}`);
  }

  getPokemonDetails(name: string): Observable<PokemonDetails> {
    return this.http.get<PokemonDetails>(`${this.baseUrl}/${name}`);
  }
}
