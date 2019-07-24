
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TopHeadlines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  private headLinesPage = 0;

  private categoriaActual = '';
  private categoriaPage = 0;

  private apiUrl = environment.apiUrl;
  private apiKey = environment.apiKey;

  private headers = new HttpHeaders({
    'X-Api-key': this.apiKey
  });

  constructor( private http: HttpClient ) { }


  /*
    declaramos la funcion para construir nuestros endpoints. esta
    funcion recibe un tipo de dato generico el cual se establece
    al momento de llamar al metodo.
  */

  private ejecutarQuery<T>( query: string ) {

    const url = `${ this.apiUrl }${ query }`;
    return this.http.get<T>( url, { headers: this.headers } );
  }


  getTopHeadlines() {

    this.headLinesPage ++;

    return this.ejecutarQuery<TopHeadlines>(`/top-headlines?country=us&category=business&page=${ this.headLinesPage }`);
    //  return this.http.get<TopHeadlines>(`${ this.url }/top-headlines?country=us&category=business&apiKey=${ this.apiKey }`);
  }

  getTopHeadlinesCategoria( categoria: string ) {


    //  si la categoria actual es la misma que categoria entonces sigue sin cambiar por lo cual se avanza a la proxima pagina

    if ( this.categoriaActual === categoria ) {
      this.categoriaPage ++;
    } else {
      //  caso contratorio cambiamos el valor de la pagina actual por lo que viene como argumento y hacemos reset a 1 la pagina actual
      this.categoriaActual = categoria;
      this.categoriaPage = 1;
    }

    return this.ejecutarQuery<TopHeadlines>(`/top-headlines?country=us&category=${ categoria }&page=${ this.categoriaPage }`);
    //  return this.http.get<TopHeadlines>(`${ this.url }/top-headlines?country=de&category=business&apiKey=${ this.apiKey }`);
  }
}
