import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {Firestore, collection, collectionData, doc, updateDoc, getDoc} from '@angular/fire/firestore';
import {UsuariosService} from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-editar-campeonato',
  templateUrl: './editar-campeonato.component.html',
  styleUrls: ['./editar-campeonato.component.scss']
})
export class EditarCampeonatoComponent {
  formulario: FormGroup;
  private firestore: Firestore = inject(Firestore);
  private jugador: any;
  public updateId: string = '';
  userRole!: string;
  
  constructor(public router: Router, private activedRoute: ActivatedRoute, private servicio: UsuariosService){
    this.userRole = localStorage.getItem('user_role') || '';
    this.formulario = new FormGroup({
      equipo: new FormControl('', [Validators.required, Validators.minLength(2)]),
      equipo_rival: new FormControl('', [Validators.required, Validators.minLength(2)]),
      ubicacion: new FormControl('', [Validators.required]),
      imagen_equipo: new FormControl('', [Validators.required, Validators.minLength(2)]),
      imagen_rival: new FormControl('', [Validators.required, Validators.minLength(2)]),
      fecha: new FormControl('', [Validators.required, Validators.minLength(2)]),
      goles: new FormControl('', [Validators.required, Validators.minLength(2)]),
      goles_rival: new FormControl('', [Validators.required, Validators.minLength(2)]),
    });
  }

  ngOnInit(): void {
    this.updateId = this.activedRoute.snapshot.paramMap.get('id') || '';
    if (this.updateId) {
      const jugadorDocRef = doc(this.firestore, 'Campeonato/' + this.updateId);
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
    const jugadorDocRef = doc(this.firestore, 'Campeonato/' + this.updateId);
    updateDoc(jugadorDocRef, this.formulario.value).then(() => {
      this.resetForm();
      this.router.navigate(['/campeonato']);
    });
  }
  logout() {
    this.servicio.logout2();
  }
}
