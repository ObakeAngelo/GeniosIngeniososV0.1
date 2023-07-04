import {Component, inject} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {Firestore, collection, collectionData, doc, updateDoc, getDoc, addDoc, deleteDoc} from '@angular/fire/firestore';
import {UsuariosService} from 'src/app/servicios/usuarios.service';
interface Financiamiento {
  nombre: string;
  apellido: string;
  equipo_entrada: string;
  equipo_salida: string;
  valor: number;
  fecha_traspaso: Date;
}
@Component({
  selector: 'app-agregar-traspasos',
  templateUrl: './agregar-traspasos.component.html',
  styleUrls: ['./agregar-traspasos.component.scss'],
})
export class AgregarTraspasosComponent {
  formulario: FormGroup;
  private firestore: Firestore = inject(Firestore);
  private jugador: any;
  public updateId: string = '';
  public nombre: any;
  public apellido: any;
  public equipo_entrada: any;
  public equipo_salida: any;
  public valor: any;
  public fecha: any;
  userRole!: string;

  constructor(public router: Router, private activedRoute: ActivatedRoute, private servicio: UsuariosService) {
    this.updateId = this.activedRoute.snapshot.paramMap.get('id') || '';
    const collectionInstance = collection(this.firestore, 'Jugadores');
    collectionData(collectionInstance, {idField: 'id'}).subscribe((response) => {
     
      this.nombre = response.filter((item) => item['id'] === this.updateId).map((item) => item['nombre']);
      this.nombre = this.nombre[0];
      
      this.apellido = response.filter((item) => item['id'] === this.updateId).map((item) => item['apellido']);
      
      this.apellido = this.apellido[0];

      this.equipo_salida = response.filter((item) => item['id'] === this.updateId).map((item) => item['equipo_entrada']);
     
      this.equipo_salida = this.equipo_salida[0];

      this.equipo_entrada = response.filter((item) => item['id'] === this.updateId).map((item) => item['equipo_salida']);
     
      this.equipo_entrada = this.equipo_entrada[0];

      this.valor = response.filter((item) => item['id'] === this.updateId).map((item) => item['valor']);
    

      this.valor = this.valor[0];
      this.userRole = localStorage.getItem('user_role') || '';
    });
    this.formulario = new FormGroup({
      nombre: new FormControl(this.nombre),
      apellido: new FormControl(this.apellido),
      equipo_salida: new FormControl(this.equipo_salida),
      equipo_entrada: new FormControl(this.equipo_entrada),
      valor: new FormControl(this.valor),
      fecha: new FormControl(this.fecha),
    });
  }
  ngOnInit(): void {
    var today = new Date();
    var now = today.toLocaleString();
    this.fecha = now;
  }

  addData() {
    this.addFinanciamiento();
    this.formulario = new FormGroup({
      nombre: new FormControl(this.nombre),
      apellido: new FormControl(this.apellido),
      equipo_salida: new FormControl(this.equipo_salida),
      equipo_entrada: new FormControl(this.equipo_entrada),
      valor: new FormControl(this.valor),
      fecha: new FormControl(this.fecha),
    });


    const collectionInstance = collection(this.firestore, 'Traspasos');
    addDoc(collectionInstance, this.formulario.value)
      .then((res) => {
        this.formulario.reset();
      })
      .catch((error) => {

      });

    const docInstance = doc(this.firestore, 'Jugadores', this.updateId);
    deleteDoc(docInstance)
      .then(() => {

      })
      .catch((err) => {

      });
  }
  addFinanciamiento() {
    const collectionInstance2 = collection(this.firestore, 'Financiamiento');

    const datos = {
      fecha: this.fecha,
      tipo: 'Ingreso',
      procedencia: 'Traspaso_' + this.nombre,
      correo: '',
      valor: this.valor,
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
