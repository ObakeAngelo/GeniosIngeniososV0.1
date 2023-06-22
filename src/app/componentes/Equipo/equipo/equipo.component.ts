import {Component, inject} from '@angular/core';
import {Observable} from 'rxjs';
import {Firestore, collection, collectionData, deleteDoc, doc, getDocs} from '@angular/fire/firestore';
import {UsuariosService} from 'src/app/servicios/usuarios.service';
@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.scss'],
})
export class EquipoComponent {
  private firestore: Firestore = inject(Firestore); // inject Cloud Firestore
  Equipo$: Observable<any>;
  updateId!: any;
  id!: string;
  userRole!: string;
  constructor(private servicio: UsuariosService) {
    const collectionInstance = collection(this.firestore, 'Equipos');
    collectionData(collectionInstance, {idField: 'id'}).subscribe(() => {});
    this.Equipo$ = collectionData(collectionInstance, {idField: 'id'});
    this.userRole = localStorage.getItem('user_role') || '';
  }

  action(type: string, index: any, data: any) {
    if (type == 'edit') {

    } else if (type == 'delete') {
      
      const docInstance = doc(this.firestore, 'Equipos', index);
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
