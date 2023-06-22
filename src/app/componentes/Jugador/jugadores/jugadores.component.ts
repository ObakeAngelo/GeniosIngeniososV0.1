import {Component, OnInit, inject} from '@angular/core';
import {Observable} from 'rxjs';
import {Jugador} from 'src/app/modelos/jugador/jugador.model';
import {Firestore, collection, collectionData, deleteDoc, doc, getDocs} from '@angular/fire/firestore';
import {UsuariosService} from 'src/app/servicios/usuarios.service';
@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.component.html',
  styleUrls: ['./jugadores.component.scss'],
})
export class JugadoresComponent {
  private firestore: Firestore = inject(Firestore); // inject Cloud Firestore
  jugadores$: Observable<any>;
  updateId!: any;
  id!: string;
  userRole!: string;
  constructor(private servicio: UsuariosService) {
    const collectionInstance = collection(this.firestore, 'Jugadores');
    collectionData(collectionInstance, {idField: 'id'}).subscribe(() => {});
    this.jugadores$ = collectionData(collectionInstance, {idField: 'id'});
    this.userRole = localStorage.getItem('user_role') || '';
  }

  action(type: string, index: any, data: any) {
    if (type == 'edit') {

    } else if (type == 'delete') {

      
      const docInstance = doc(this.firestore, 'Jugadores', index);
      deleteDoc(docInstance)
        .then(() => {
        
        })
        .catch((err) => {
          
        });
    } else {
   
    }
    this.updateId = index;

  }
  logout() {
    this.servicio.logout2();
  }
}
