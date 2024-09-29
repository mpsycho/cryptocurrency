import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export interface Crypto {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_percentage_24h: number;
  circulating_supply: number;
}

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private baseUrl = 'https://api.coingecko.com/api/v3/coins/markets';

  constructor(private http: HttpClient) {}

  getData(
    vsCurrency: string = 'usd',
    order: string = 'market_cap_desc',
    perPage: number = 250,
    page: number = 1,
    sparkline: boolean = false
  ): Observable<Crypto[]> {
    let params = new HttpParams()
      .set('vs_currency', vsCurrency)
      .set('order', order)
      .set('per_page', perPage.toString())
      .set('page', page.toString())
      .set('sparkline', sparkline.toString());

    return this.http.get<Crypto[]>(this.baseUrl, { params }).pipe(
      map((cryptos) =>
        cryptos.map((crypto) => ({
          id: crypto.id,
          name: crypto.name,
          symbol: crypto.symbol,
          current_price: crypto.current_price,
          market_cap: crypto.market_cap,
          total_volume: crypto.total_volume,
          high_24h: crypto.high_24h,
          low_24h: crypto.low_24h,
          price_change_percentage_24h: crypto.price_change_percentage_24h,
          circulating_supply: crypto.circulating_supply,
        }))
      )
    );
  }
}
