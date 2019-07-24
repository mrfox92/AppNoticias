import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';


@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticias: Article[] = [];

  constructor( private storage: Storage ) {
    //  cargamos los favoritos
    this.cargarFavoritos();
  }


  //  se encargara de ir guardando las noticias que agregue el usuario a favoritos
  guardarNoticia( noticia: Article ) {

    //  find retorna el elemento que coincide en un arreglo buscado. caso contrario retorna undefined.
    const existe = this.noticias.find( item => {
      return item.title === noticia.title;
    });

    //  unshift pone el elemento al comienzo del arreglo
    //  unicamente grabamos en nuestro storage si la noticia no existe, para evitar duplicidad.
    if ( !existe ) {

      this.noticias.unshift( noticia );
      //  storage = key / value
      this.storage.set('favoritos', this.noticias );
    }

  }

  //  leemos el storage. si hay informacion guardada retorna los datos, caso contrario retorna undefind.
  async cargarFavoritos() {
    const favoritos = await this.storage.get('favoritos');
    if ( favoritos ) {
      //  asignamos las noticias agregadas a favoritos al array
      this.noticias = favoritos;
    }

  }


  borrarNoticia( noticia: Article ) {

    this.noticias = this.noticias.filter( item => {
      return item.title !== noticia.title;
    });

    //  guardamos el nuevo array en el storage
    this.storage.set('favoritos', this.noticias );
  }
}
