
import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/interfaces';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { DataLocalService } from '../../services/data-local.service';
//  Toasts
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {


  @Input() noticia: Article;
  @Input() indice: number;
  @Input() enFavoritos: boolean;

  constructor(
    private actionSheetController: ActionSheetController,
    private socialSharing: SocialSharing,
    private iab: InAppBrowser,
    private dataLocalService: DataLocalService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    //  console.log( this.enFavoritos );
  }

  abrirNoticia() {
    const browser = this.iab.create( this.noticia.url, '_system' );
  }

  async toastMessage( mensaje: string ) {

    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'top'
    });

    toast.present();
  }

  async lanzarMenu() {

    let guardarBorrarButton;

    if ( this.enFavoritos ) {
      //  borrar favoritos
      guardarBorrarButton = {
        text: 'Borrar',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          //  console.log('Borrar de favorito');
          this.toastMessage('Noticia borrada de favoritos');
          //  Borrar noticia de favoritos
          this.dataLocalService.borrarNoticia( this.noticia );
        }
      };
    } else {
      //  mostrar favoritos
      guardarBorrarButton = {
        text: 'Favoritos',
        icon: 'heart',
        cssClass: 'action-dark',
        handler: () => {
          //  console.log('Favoritos click');
          this.toastMessage('Noticia agregada a favoritos');
          this.dataLocalService.guardarNoticia( this.noticia );
        }
      };
    }

    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text: 'Compartir',
        icon: 'share',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Compartir click');
          this.socialSharing.share(
            this.noticia.title,
            this.noticia.source.name,
            '',
            this.noticia.url
          );
        }
      },
      guardarBorrarButton,
      {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Cancelar click');
        }
      }]
    });
    await actionSheet.present();
  }

}
