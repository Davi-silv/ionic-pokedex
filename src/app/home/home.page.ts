import { Component, OnInit } from '@angular/core';
import { PokemonService, PokemonListResponse } from '../services/pokemon.service';
import { FavoritesService } from '../services/favorites.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  pokemons: any[] = [];
  total: number = 0;
  offset: number = 0;
  limit: number = 20;
  loading: boolean = false;
  favorites: string[] = [];

  constructor(
    private pokemonService: PokemonService,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit() {
    this.loadFavorites();
    this.loadPokemons();
  }

  loadFavorites() {
    this.favorites = this.favoritesService.getFavorites();
  }

  loadPokemons(event?: any) {
    this.loading = true;
    this.pokemonService.getPokemonList(this.offset, this.limit).subscribe({
      next: (res: PokemonListResponse) => {
        this.total = res.count;
        this.pokemons = res.results;
        this.loading = false;
        if (event) event.target.complete();
      },
      error: () => {
        this.loading = false;
        if (event) event.target.complete();
      }
    });
  }

  nextPage() {
    if (this.offset + this.limit < this.total) {
      this.offset += this.limit;
      this.loadPokemons();
    }
  }

  prevPage() {
    if (this.offset - this.limit >= 0) {
      this.offset -= this.limit;
      this.loadPokemons();
    }
  }

  isFavorite(name: string): boolean {
    return this.favorites.includes(name);
  }

  toggleFavorite(name: string) {
    if (this.isFavorite(name)) {
      this.favoritesService.removeFavorite(name);
    } else {
      this.favoritesService.addFavorite(name);
    }
    this.loadFavorites();
  }

  getPokemonId(url: string): string {
    // A URL é algo como https://pokeapi.co/api/v2/pokemon/1/
    const parts = url.split('/').filter(Boolean);
    return parts[parts.length - 1];
  }
}
