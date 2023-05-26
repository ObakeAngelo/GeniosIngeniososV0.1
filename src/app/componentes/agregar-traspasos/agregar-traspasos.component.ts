import {Component, inject} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {Firestore, collection, collectionData, doc, updateDoc, getDoc, addDoc} from '@angular/fire/firestore';
interface Financiamiento {
  nombre: string;
  apellido: string;
  equipo_entrada: string;
  equipo_salida: string;
  valor: number;
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

  constructor(public router: Router, private activedRoute: ActivatedRoute) {
    this.updateId = this.activedRoute.snapshot.paramMap.get('id') || '';
    const collectionInstance = collection(this.firestore, 'Jugadores');
    collectionData(collectionInstance, {idField: 'id'}).subscribe((response) => {
      console.log(response);
      this.nombre = response.filter((item) => item['id'] === this.updateId).map((item) => item['nombre']);
      this.nombre = this.nombre[0];
      console.log('nombre', this.nombre);

      this.apellido = response.filter((item) => item['id'] === this.updateId).map((item) => item['apellido']);
      console.log('apellido', this.apellido);
      this.apellido = this.apellido[0];

      this.equipo_entrada = response.filter((item) => item['id'] === this.updateId).map((item) => item['equipo_entrada']);
      console.log('equipo_entrada', this.equipo_entrada);
      this.equipo_entrada = this.equipo_entrada[0];

      this.equipo_salida = response.filter((item) => item['id'] === this.updateId).map((item) => item['equipo_salida']);
      console.log('equipo_salida', this.equipo_salida);
      this.equipo_salida = this.equipo_salida[0];

      this.valor = response.filter((item) => item['id'] === this.updateId).map((item) => item['valor']);
      console.log('valor', this.valor);

      this.valor = response[0]['valor'];
    });
    this.formulario = new FormGroup({
      nombre: new FormControl(this.nombre),
      apellido: new FormControl(this.apellido),
      equipo_salida: new FormControl(this.equipo_salida),
      equipo_entrada: new FormControl(this.equipo_entrada),
      valor: new FormControl(this.valor),
    });
  }
  ngOnInit(): void {}

  addData() {
    this.formulario = new FormGroup({
      nombre: new FormControl(this.nombre),
      apellido: new FormControl(this.apellido),
      equipo_salida: new FormControl(this.equipo_salida),
      equipo_entrada: new FormControl(this.equipo_entrada),
      valor: new FormControl(this.valor),
    });
    console.log(this.formulario.value);
    console.log(this.nombre);

    const collectionInstance = collection(this.firestore, 'Traspasos');
    addDoc(collectionInstance, this.formulario.value)
      .then((res) => {
        this.formulario.reset();
      })
      .catch((error) => {
        console.log('Error ====>', error);
      });
  }
}
