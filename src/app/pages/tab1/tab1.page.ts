import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  public noticias: Article[] = [];

  constructor( private noticiasService: NoticiasService ) {}

  ngOnInit() {
    this.cargarNoticias();
  }

  loadData( event ) {

    //  console.log(event);
    this.cargarNoticias( event );
    //  se debe evaluar si no hay mas noticias que cargar

  }

  cargarNoticias( event? ) {

    this.noticiasService.getTopHeadlines().subscribe( resp => {
      console.log( resp );
      //  cargamos las noticias
      this.noticias.push( ...resp.articles );

      //  comprobamos si viene como argumento el evento del infinite scroll
      if ( event ) {
        //  decimos que target complete cuando el evento resuelve y carga la nueva data
        event.target.complete();
        //  cuando no haya informacion que cargar el infinite scroll se bloqueara.
        if ( this.noticias.length === resp.totalResults ) {
          event.target.disabled = true;
        }
      }

    });
  }

}
