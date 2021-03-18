import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Coffee } from '../../shared/interfaces/coffee.interface';

@Injectable()
export class CoffeeService {
  private readonly http: HttpClient;
  private readonly url: string;

  public constructor(http: HttpClient) {
    this.http = http;
    this.url = `${environment.domain}/api/coffees`;
  }

  public getAllForDisplay(): Observable<Coffee[]> {
    const url = `${this.url}?fields=name,image,price`;
    return this.http.get<Coffee[]>(url).pipe(
      map(coffees => {
        // remove repeating names
        const distinctNames = new Set<string>(coffees.map(c => c.name));

        // sort all coffees by price ascending
        const sorted = coffees.sort((a, b) => a.price - b.price);

        // take first item of each coffee, having lower prices first,
        // thus taking for each coffee only the one that has the lowest price
        const lowerPriceProducts = Array.from(distinctNames)
          .map(name => sorted.find(coffee => coffee.name === name));

        return lowerPriceProducts;
      })
    );
  }

  public getVariants(name: string): Observable<Coffee[]> {
    const url = `${this.url}?name=${name}`;
    return this.http.get<Coffee[]>(url);
  }
}
