import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../services/auth.service';
import { ToastComponent } from '../shared/toast/toast.component';

import { Product } from '../shared/models/product.model';

import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {
  
  constructor( public toast: ToastComponent,
  private orderService: OrderService ) { }

  products = []
  
  ngOnInit() {
    this.products = JSON.parse(localStorage.getItem('cart'))
  }

  removeProduct(product: Product) {
    var a = JSON.parse(localStorage.getItem('cart'))
    a.splice(a.indexOf(product), 1);
    localStorage.setItem('cart', JSON.stringify(a));
    this.products = JSON.parse(localStorage.getItem('cart'))
    this.toast.setMessage('Product already remove from cart.', 'success');
  }

  orderProduct() {
    var products = this.products
    this.orderService.addOrder({products: this.products}).subscribe(
      res => {
        this.products = []
        localStorage.removeItem('cart')
        this.toast.setMessage('order successfully.', 'success');
      },
      error => console.log(error)
    );
  }
}
