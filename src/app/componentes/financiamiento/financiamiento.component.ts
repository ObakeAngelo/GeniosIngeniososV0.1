import {Component, OnInit, inject} from '@angular/core';
import {Observable} from 'rxjs';
import {Firestore, collection, collectionData, deleteDoc, doc, getDocs} from '@angular/fire/firestore';
import {Chart, registerables} from 'node_modules/chart.js';
import {UsuariosService} from 'src/app/servicios/usuarios.service';
Chart.register(...registerables);
interface Financiamiento {
  Tipo: string;
  Valor: number;
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
  userRole!: string;
  constructor(private servicio: UsuariosService) {
    const collectionInstance = collection(this.firestore, 'Financiamiento');
    collectionData(collectionInstance, {idField: 'id'}).subscribe((response) => {
      console.log(response);
      this.ingresos = response
        .filter((item) => item['tipo'] === 'Ingreso')
        .map((item) => item['valor'])
        .reduce((acc, current) => acc + current, 0);
      console.log('Ingresos', this.ingresos);

      this.egresos = response
        .filter((item) => item['tipo'] === 'Egreso')
        .map((item) => item['valor'])
        .reduce((acc, current) => acc + current, 0);
      console.log('Egresos', this.egresos);
      this.RenderChart();

      this.total = this.ingresos - this.egresos;
      this.userRole = localStorage.getItem('user_role') || '';
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
