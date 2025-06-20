import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'pokemonIdFromName' })
export class PokemonIdFromNamePipe implements PipeTransform {
  transform(name: string): string {
    // A PokeAPI não fornece o ID diretamente pelo nome, mas para a maioria dos casos,
    // o nome pode ser convertido para o ID se necessário, ou pode-se buscar por ordem alfabética.
    // Aqui, retornamos o próprio nome para manter a URL, mas o ideal seria buscar o ID real.
    return name;
  }
}

@NgModule({
  declarations: [AppComponent, PokemonIdFromNamePipe],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
