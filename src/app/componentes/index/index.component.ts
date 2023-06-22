import {Component, OnInit, inject} from '@angular/core';
import {IPayPalConfig, ICreateOrderRequest} from 'ngx-paypal';
import {ActivatedRoute} from '@angular/router';
import {Firestore, collection, collectionData, doc, addDoc, setDoc, updateDoc} from '@angular/fire/firestore';
import {Financiamineto} from 'src/app/modelos/financiamientos/financiamineto';
import {FormControl, FormGroup} from '@angular/forms';
import axios from 'axios';
import {UsuariosService} from 'src/app/servicios/usuarios.service';
import {Observable} from 'rxjs';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  public payPalConfig?: IPayPalConfig;
  userRole!: string;
  userEmail!: string;
  formulario: FormGroup;
  private firestore: Firestore = inject(Firestore);
  valor = 0;
  correo = '';
  public fecha: any;
  usuarios$: Observable<any>;
  id = '';

  constructor(private route: ActivatedRoute, private servicio: UsuariosService) {
    this.userRole = localStorage.getItem('user_role') || '';
    this.userEmail = localStorage.getItem('user_email') || '';
    this.formulario = new FormGroup({
      fecha: new FormControl(),
      tipo: new FormControl('Ingreso'),
      procedencia: new FormControl('Socios'),
      correo: new FormControl(),
      valor: new FormControl(),
    });

    const collectionInstance = collection(this.firestore, 'users');
    collectionData(collectionInstance, {idField: 'id'}).subscribe(() => {});
    this.usuarios$ = collectionData(collectionInstance, {idField: 'id'});
  }

  ngOnInit(): void {
    var today = new Date();
    var now = today.toLocaleString();
    console.log(now);
    this.fecha = now;
    this.initConfig();
    this.api(10);

    this.usuarios$.forEach((elemento) => {
      const usuarioPorCorreo = elemento.find((usuario: {email: string}) => usuario.email === this.userEmail);
      this.id = usuarioPorCorreo.id;
    });
  }
  private initConfig(): void {
    this.payPalConfig = {
      currency: 'USD',
      clientId: 'AYIvK-o2mpa63FzJfMlIuOAOpKvbjLx-ZXQHCysEWU31WCu4dRZPsfm_BJVsXXJvzbIdsVeoRY20q-rO',
      createOrderOnClient: (data) =>
        <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: '10',
                breakdown: {
                  item_total: {
                    currency_code: 'USD',
                    value: '10',
                  },
                },
              },
              items: [
                {
                  name: 'Enterprise Subscription',
                  quantity: '1',
                  category: 'DIGITAL_GOODS',
                  unit_amount: {
                    currency_code: 'USD',
                    value: '10',
                  },
                },
              ],
            },
          ],
        },
      advanced: {
        commit: 'true',
      },
      style: {
        label: 'subscribe',
        layout: 'horizontal',
        shape: 'pill',
        color: 'black',
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then((details: any) => {
         
        });
      },
      onClientAuthorization: (data) => {
        if (data.payer.email_address !== undefined) {
          this.correo = data.payer.email_address;
        } else {
          this.correo = '';
        }
        this.formulario = new FormGroup({
          fecha: new FormControl(this.fecha),
          tipo: new FormControl('Ingreso'),
          procedencia: new FormControl('Socios'),
          correo: new FormControl(this.correo),
          valor: new FormControl(this.valor),
        });
        const collectionInstance = collection(this.firestore, 'Financiamiento');
        const path = 'Financiamiento';

        const datos = {
          email: this.userEmail,
          role: 'socio',
        };
        const usuarioref = doc(this.firestore, 'users/' + this.id);
        updateDoc(usuarioref, datos).then(() => {
          
        });
        localStorage.setItem('user_role', 'socio' ?? '');
        window.location.reload();

        addDoc(collectionInstance, this.formulario.value)
          .then((res) => {
            
          })
          .catch((error) => {
            
          });
      },
      onCancel: (data, actions) => {
        
      },
      onError: (err) => {
        
      },
      onClick: (data, actions) => {
        
      },
    };
  }

  async obtenerTasaDeCambio(): Promise<number> {
    try {
      const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
      const rates = response.data.rates;
      const tasaDeCambio = rates['CLP'];
      return tasaDeCambio;
    } catch (error) {
      console.error('Error al obtener la tasa de cambio:', error);
      throw error;
    }
  }

  // Función para convertir dólares a pesos chilenos
  async api(dolares: number): Promise<number> {
    try {
      const tasaDeCambio = await this.obtenerTasaDeCambio();
      const pesosChilenos = dolares * tasaDeCambio;
      console.log(pesosChilenos);
      this.valor = pesosChilenos;
      return pesosChilenos;
    } catch (error) {
      throw error;
    }
  }
  logout() {
    this.servicio.logout2();
  }
}
