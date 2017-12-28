import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Order } from '../shared/models/order.model';

@Injectable()
export class OrderService {

  constructor(private http: HttpClient) { }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>('/api/orders');
  }

  addOrder(order: Order): Observable<Order> {
    return this.http.post<Order>('/api/order', order);
  }

  getOrder(order: Order): Observable<Order> {
    return this.http.get<Order>(`/api/order/${order}`);
  }

  deleteOrder(order: Order): Observable<string> {
    return this.http.delete(`/api/order/${order._id}`, { responseType: 'text' });
  }

}
