import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../services/favorites.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  favorites: string[] = [];

  constructor(
    private favoritesService: FavoritesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadFavorites();
  }

  ionViewWillEnter() {
    this.loadFavorites();
  }

  loadFavorites() {
    this.favorites = this.favoritesService.getFavorites();
  }

  removeFavorite(name: string) {
    this.favoritesService.removeFavorite(name);
    this.loadFavorites();
  }

  goToDetails(name: string) {
    this.router.navigate(['/details', name]);
  }
}
