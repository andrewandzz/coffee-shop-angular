import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CreateOrderItem } from '../interfaces/create-order-item.interface';
import { OrderItem } from '../interfaces/order-item.interface';
import { UpdateOrderItem } from '../interfaces/update-order-item.interface';
import { OrderService } from './order.service';

@Injectable()
export class OrderItemService {
  private readonly http: HttpClient;
  private readonly orderService: OrderService;
  private readonly url: string;

  public constructor(
    http: HttpClient,
    orderService: OrderService
  ) {
    this.http = http;
    this.orderService = orderService;
    this.url = `${environment.domain}/api/order-items`;
  }

  public getAllByCustomerGuid(customerGuid: string): Observable<OrderItem[]> {
    const url = `${this.url}?customer-guid=${customerGuid}&checked-out=false`;
    return this.http.get<OrderItem[]>(url);
  }

  public addForCustomerGuid(orderItem: CreateOrderItem, customerGuid: string): Observable<OrderItem> {
    return this.orderService.addIfNotExist(customerGuid).pipe(
      switchMap(_ => this.add(orderItem, customerGuid))
    );
  }

  public updateById(orderItem: UpdateOrderItem, id: number): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.patch(url, orderItem);
  }

  public removeById(id: number): Observable<OrderItem> {
    const url = `${this.url}/${id}`;
    return this.http.delete<OrderItem>(url);
  }

  private add(orderItem: CreateOrderItem, customerGuid: string): Observable<OrderItem> {
    orderItem.customerGuid = customerGuid;
    return this.http.post<OrderItem>(this.url, orderItem, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }
}
