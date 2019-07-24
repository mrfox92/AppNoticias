
import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment, IonInfiniteScroll } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  @ViewChild(IonSegment) segment: IonSegment;

  //  obtenemos el elemento infinite scroll del html.
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  public categorias = ['general', 'business', 'entertainment', 'health', 'science', 'sports', 'technology'];

  noticias: Article[] = [];

  constructor( private noticiasService: NoticiasService ) {}

  ngOnInit() {
    //  Asignamos un valor por defecto a nuestro segmento con la primera pos. del arreglo categorias
    this.segment.value = this.categorias[0];
    //  Cargamos las noticias con la categoria inicial
    this.cargarNoticias( this.categorias[0] );
  }


  loadData( event ) {
    //  enviamos el evento del infinite scroll
    this.cargarNoticias( this.segment.value, event );
  }


  cambioCategoria( event ) {

    //  vaciamos nuestro array de noticias
    this.noticias = [];
    //  llamamos a nuestro metodo para cargar noticias y le pasamos la categoria
    this.cargarNoticias( event.detail.value );
  }

  //  este metodo hace la peticion a nuestro servicio de noticias
  cargarNoticias( categoria: string, event? ) {

    this.noticiasService.getTopHeadlinesCategoria( categoria ).subscribe( resp => {
      //  console.log( resp );
      //  Nota: debemos insertar cada uno de los elementos de forma independiente, para ello utilizamos spread operator de JS.
      //  seteamos por defecto que el infinite scroll esta deshabilitado.
      this.infiniteScroll.disabled = false;
      //  enviamos la data de respuesta dentro del array
      this.noticias.push( ...resp.articles );

      //  evaluamos si el evento para cargar data viene como argumento,
      //  de ser así utilizamos el metodo complete para que el infinite scroll resuelva.

      if ( event ) {

        event.target.complete();

        if ( this.noticias.length === resp.totalResults ) {
          this.infiniteScroll.disabled = true;
        }

      }

    });
  }

}
