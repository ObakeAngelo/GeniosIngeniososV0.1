
import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Firestore, collection, collectionData, doc, addDoc} from '@angular/fire/firestore';
import {UsuariosService} from 'src/app/servicios/usuarios.service';
import { ImagenesService } from 'src/app/servicios/imagenes.service';

@Component({
  selector: 'app-agregar-campeonato',
  templateUrl: './agregar-campeonato.component.html',
  styleUrls: ['./agregar-campeonato.component.scss']
})
export class AgregarCampeonatoComponent {
  formulario: FormGroup;
  newimage1 = '';
  newimage2 = '';
  newfile1 = '';
  newfile2 = '';
  correo = '';
  public fecha: any;
  public cargandoImagen = false;
  private firestore: Firestore = inject(Firestore);
  userRole!: string;
  submitted = false;
  isLoading = false;
  constructor(public router: Router, public imagenservice: ImagenesService, private servicio: UsuariosService){
    this.userRole = localStorage.getItem('user_role') || '';
    this.formulario = new FormGroup({
      equipo: new FormControl('', [Validators.required, Validators.minLength(2)]),
      equipo_rival: new FormControl('', [Validators.required, Validators.minLength(2)]),
      ubicacion: new FormControl('', [Validators.required]),
      imagen_equipo: new FormControl('', [Validators.required, Validators.minLength(2)]),
      imagen_rival: new FormControl('', [Validators.required, Validators.minLength(2)]),
      fecha: new FormControl('', [Validators.required, Validators.minLength(2)]),
      goles: new FormControl(0, [Validators.required, Validators.minLength(2)]),
      goles_rival: new FormControl(0, [Validators.required, Validators.minLength(2)]),
    });

  }

  async nuevaImagen1(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.newfile1 = event.target.files[0];

      const reader1 = new FileReader();

      reader1.onload = (imagen) => {
        if (imagen.target) {
          this.newimage1 = imagen.target.result as string;
        }
      };

      reader1.readAsDataURL(event.target.files[0]);
    }
  }
  
  async nuevaImagen2(event: any) {
    if (event.target.files && event.target.files[0]) {
     
      this.newfile2 = event.target.files[0];
      const reader2 = new FileReader();

      reader2.onload = (imagen) => {
        if (imagen.target) {
          this.newimage2 = imagen.target.result as string;
        }
      };
      reader2.readAsDataURL(event.target.files[0]);
    }
  }
  async addData() {
    if (this.formulario.valid) {
      const collectionInstance = collection(this.firestore, 'Campeonato');

      const path = 'Campeonato';
      const name1 = this.formulario.value.equipo;
      const name2 = this.formulario.value.equipo_rival;
      const res1 = await this.imagenservice.subirImagen(this.newfile1, path, name1);
      const res2 = await this.imagenservice.subirImagen(this.newfile2, path, name2);
      this.formulario.value.imagen_equipo = res1;
      this.formulario.value.imagen_rival = res2;

      addDoc(collectionInstance, this.formulario.value)

        .then((res) => {
          this.formulario.reset();
        })
        .catch((error) => {
          
        });
      this.formulario.reset();
      this.submitted = false;
      this.isLoading = false;
    } else {
     
    }
  }
  logout() {
    this.servicio.logout2();
  }

}
