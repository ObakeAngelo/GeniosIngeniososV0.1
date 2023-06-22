import {Component, inject} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {Firestore, collection, collectionData, doc, updateDoc, getDoc} from '@angular/fire/firestore';
import {UsuariosService} from 'src/app/servicios/usuarios.service';
@Component({
  selector: 'app-modificar-equipo',
  templateUrl: './modificar-equipo.component.html',
  styleUrls: ['./modificar-equipo.component.scss'],
})
export class ModificarEquipoComponent {
  formulario: FormGroup;

  private firestore: Firestore = inject(Firestore);
  private equipo: any;

  public updateId: string = '';
  userRole!: string;

  constructor(public router: Router, private activedRoute: ActivatedRoute, private servicio: UsuariosService) {
    this.userRole = localStorage.getItem('user_role') || '';
    this.formulario = new FormGroup({
      nombre: new FormControl(),
      apellido: new FormControl(),
      rut: new FormControl(),
      correo: new FormControl(),
      contrasena: new FormControl(),
      permisos: new FormControl(),
      sueldo: new FormControl(),
      valor_hora_extra: new FormControl(),
      equipo_entrada: new FormControl(),
      fotografia: new FormControl(),
      extras_realizadas: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.updateId = this.activedRoute.snapshot.paramMap.get('id') || '';
    if (this.updateId) {
      const equipoDocRef = doc(this.firestore, 'Equipos/' + this.updateId);
      getDoc(equipoDocRef).then((doc) => {
        if (doc.exists()) {
          
          this.formulario.setValue(doc.data());
        } else {
          
        }
      });
    }
  }

  resetForm() {
    this.formulario.reset();
  }

  editData() {
    
    const jugadorDocRef = doc(this.firestore, 'Equipos/' + this.updateId);
    updateDoc(jugadorDocRef, this.formulario.value).then(() => {
      
      this.resetForm();
      this.router.navigate(['/equipo']);
    });
  }
  logout() {
    this.servicio.logout2();
  }
}
