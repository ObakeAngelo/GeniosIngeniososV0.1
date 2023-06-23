import {Component, OnInit, inject} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Firestore, collection, collectionData, deleteDoc, doc, getDocs} from '@angular/fire/firestore';
import {Chart, registerables} from 'node_modules/chart.js';
import {UsuariosService} from 'src/app/servicios/usuarios.service';
Chart.register(...registerables);
interface Financiamiento {
  Tipo: string;
  Valor: number;
}
interface Ingreso {
  correo: string;
  valor: number;
  fecha: string;
  tipo: string;
  procedencia: string;
}
@Component({
  selector: 'app-financiamiento',
  templateUrl: './financiamiento.component.html',
  styleUrls: ['./financiamiento.component.scss'],
})
export class FinanciamientoComponent implements OnInit {
  public chart: any;
  private firestore: Firestore = inject(Firestore); // inject Cloud Firestore
  public ingresos: number = 0;
  public egresos: number = 0;
  public total: number = 0;
  financiamiento$: Observable<any>;
  userRole!: string;
  ingresostotales$!: Observable<any[]>;
  engresostotales$!: Observable<any[]>;
  constructor(private servicio: UsuariosService) {
    const collectionInstance = collection(this.firestore, 'Financiamiento');
    collectionData(collectionInstance, {idField: 'id'}).subscribe((response) => {
     
      this.ingresos = response
        .filter((item) => item['tipo'] === 'Ingreso')
        .map((item) => item['valor'])
        .reduce((acc, current) => acc + current, 0);
      

      this.egresos = response
        .filter((item) => item['tipo'] === 'Egreso')
        .map((item) => item['valor'])
        .reduce((acc, current) => acc + current, 0);
     
      this.RenderChart();

      this.total = this.ingresos - this.egresos;
      this.userRole = localStorage.getItem('user_role') || '';
    });
    this.financiamiento$ = collectionData(collectionInstance, {idField: 'id'});
    this.financiamiento$.subscribe((elementos: any[]) => {
      const ingresototal = elementos.filter((ingreso: { tipo: string }) => ingreso.tipo === 'Ingreso');
      this.ingresostotales$ = of(ingresototal); // Convierte el arreglo en un objeto Observable
      console.log(this.ingresostotales$);

      const engresototal = elementos.filter((egreso: { tipo: string }) => egreso.tipo === 'Egreso');
      this.engresostotales$ = of(engresototal); // Convierte el arreglo en un objeto Observable
      console.log(this.engresostotales$);
    });
  }

  ngOnInit(): void {}

  RenderChart() {
    this.chart = new Chart('pieChart', {
      type: 'doughnut',
      data: {
        labels: ['Ingreso', 'Egreso'],
        datasets: [
          {
            label: '$',
            data: [this.ingresos, this.egresos],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
  logout() {
    this.servicio.logout2();
  }
}
