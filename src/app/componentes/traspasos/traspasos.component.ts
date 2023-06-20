import {Component, inject} from '@angular/core';
import {Observable} from 'rxjs';
import {Firestore, collection, collectionData, deleteDoc, doc, getDocs} from '@angular/fire/firestore';
import {UsuariosService} from 'src/app/servicios/usuarios.service';
@Component({
  selector: 'app-traspasos',
  templateUrl: './traspasos.component.html',
  styleUrls: ['./traspasos.component.scss'],
})
export class TraspasosComponent {
  private firestore: Firestore = inject(Firestore); // inject Cloud Firestore
  Trapaso$: Observable<any>;
  userRole!: string;
  constructor(private servicio: UsuariosService) {
    const collectionInstance = collection(this.firestore, 'Traspasos');
    collectionData(collectionInstance, {idField: 'id'}).subscribe(() => {});
    this.Trapaso$ = collectionData(collectionInstance, {idField: 'id'});
    this.userRole = localStorage.getItem('user_role') || '';
  }
  logout() {
    this.servicio.logout2();
  }
}
