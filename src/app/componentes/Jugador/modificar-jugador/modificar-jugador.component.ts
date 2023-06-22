import {Component, inject} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {Firestore, collection, collectionData, doc, updateDoc, getDoc} from '@angular/fire/firestore';
import {UsuariosService} from 'src/app/servicios/usuarios.service';
@Component({
  selector: 'app-modificar-jugador',
  templateUrl: './modificar-jugador.component.html',
  styleUrls: ['./modificar-jugador.component.scss'],
})
export class ModificarJugadorComponent {
  formulario: FormGroup;
  private firestore: Firestore = inject(Firestore);
  private jugador: any;
  public updateId: string = '';
  userRole!: string;

  constructor(public router: Router, private activedRoute: ActivatedRoute, private servicio: UsuariosService) {
    this.userRole = localStorage.getItem('user_role') || '';
    this.formulario = new FormGroup({
      nombre: new FormControl(),
      apellido: new FormControl(),
      fotografia: new FormControl(),
      edad: new FormControl(),
      posicion: new FormControl(),
      goles: new FormControl(),
      asistencias: new FormControl(),
      t_amarillas: new FormControl(),
      t_rojas: new FormControl(),
      partidos: new FormControl(),
      equipo_entrada: new FormControl(),
      equipo_salida: new FormControl(),
      tipo: new FormControl(),
      sueldo: new FormControl(),
      valor: new FormControl(),
      estado: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.updateId = this.activedRoute.snapshot.paramMap.get('id') || '';
    if (this.updateId) {
      const jugadorDocRef = doc(this.firestore, 'Jugadores/' + this.updateId);
      getDoc(jugadorDocRef).then((doc) => {
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
    
    const jugadorDocRef = doc(this.firestore, 'Jugadores/' + this.updateId);
    updateDoc(jugadorDocRef, this.formulario.value).then(() => {
      
      this.resetForm();
      this.router.navigate(['/jugadores']);
    });
  }
  logout() {
    this.servicio.logout2();
  }
}
