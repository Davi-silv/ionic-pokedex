import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private storageKey = 'favoritePokemons';

  constructor() { }

  getFavorites(): string[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  addFavorite(name: string) {
    const favorites = this.getFavorites();
    if (!favorites.includes(name)) {
      favorites.push(name);
      localStorage.setItem(this.storageKey, JSON.stringify(favorites));
    }
  }

  removeFavorite(name: string) {
    let favorites = this.getFavorites();
    favorites = favorites.filter(fav => fav !== name);
    localStorage.setItem(this.storageKey, JSON.stringify(favorites));
  }
}
