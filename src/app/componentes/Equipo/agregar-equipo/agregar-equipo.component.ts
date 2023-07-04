import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Firestore, collection, collectionData, doc, addDoc} from '@angular/fire/firestore';
import {Equipo} from 'src/app/modelos/equipo/equipo.model';
import {ImagenesService} from './../../../servicios/imagenes.service';
import {UsuariosService} from 'src/app/servicios/usuarios.service';
@Component({
  selector: 'app-agregar-equipo',
  templateUrl: './agregar-equipo.component.html',
  styleUrls: ['./agregar-equipo.component.scss'],
})
export class AgregarEquipoComponent {
  formulario: FormGroup;
  public imagenBase64 = '';
  public fecha: any;
  public cargandoImagen = false;
  private firestore: Firestore = inject(Firestore);
  newimage = '';
  newfile = '';
  submitted = false;
  isLoading = false;
  userRole!: string;
  constructor(public router: Router, public imagenservice: ImagenesService, private servicio: UsuariosService) {
    this.userRole = localStorage.getItem('user_role') || '';
    this.formulario = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(2)]),
      apellido: new FormControl('', [Validators.required, Validators.minLength(2)]),
      rut: new FormControl('', [Validators.required, Validators.minLength(2)]),
      correo: new FormControl('', [Validators.required, Validators.minLength(2)]),
      contrasena: new FormControl('', [Validators.required, Validators.minLength(2)]),
      sueldo: new FormControl('', [Validators.required, Validators.minLength(2)]),
      valor_hora_extra: new FormControl('', [Validators.required, Validators.minLength(2)]),
      equipo_entrada: new FormControl('', [Validators.required, Validators.minLength(2)]),
      fotografia: new FormControl('', [Validators.required]),
      extras_realizadas: new FormControl('', [Validators.required, Validators.minLength(2)]),
    });
  }

  ngOnInit(): void {
    var today = new Date();
    var now = today.toLocaleString();

    this.fecha = now;
  }
  async nuevaImagen(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.newfile = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (imagen) => {
        if (imagen.target) {
          this.newimage = imagen.target.result as string;
        }
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }
  async addData() {
    if (this.formulario.valid) {
      this.addFinanciamiento();
      const path = 'Equipo';
      const name = this.formulario.value.nombre;
      const res = await this.imagenservice.subirImagen(this.newfile, path, name);
      this.formulario.value.fotografia = res;

      const collectionInstance = collection(this.firestore, 'Equipos');
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
  addFinanciamiento() {
    const collectionInstance2 = collection(this.firestore, 'Financiamiento');
    const procedencia = 'Sueldo_' + this.formulario.value.nombre;
    const valor = this.formulario.value.sueldo;

    const datos = {
      fecha: this.fecha,
      tipo: 'Egreso',
      procedencia: procedencia,
      correo: '',
      valor: valor,
    };
    addDoc(collectionInstance2, datos)
      .then((res) => {
    
      })
      .catch((error) => {
      
      });
  }
  logout() {
    this.servicio.logout2();
  }
}
