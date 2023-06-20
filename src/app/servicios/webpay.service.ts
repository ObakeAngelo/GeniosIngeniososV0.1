import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {WebpayPlus} from 'transbank-sdk';
import {Options, IntegrationApiKeys, Environment, IntegrationCommerceCodes} from 'transbank-sdk';
@Injectable({
  providedIn: 'root',
})
export class WebpayService {
  private commerceCode = '597055555532';
  private apiKey = '579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C';
  private environment = Environment.Integration; // o 'PRODUCCIÓN' si ya estás en producción

  constructor(private http: HttpClient) {}
  public procesarPago(data: any) {
    const webpay = new WebpayPlus.Transaction({
      commerceCode: this.commerceCode,
      apiKey: this.apiKey,
      environment: this.environment,
    });
  }
}
