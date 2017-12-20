import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../services/auth.service';
import { ToastComponent } from '../shared/toast/toast.component';

import { ProductService } from '../services/product.service';

import { Product } from '../shared/models/product.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html'
})
export class DetailComponent implements OnInit {

  constructor(private productService: ProductService,
              private route: Router,
              public toast: ToastComponent,
              private activatedRoute: ActivatedRoute ) { }

  product = new Product();
  
  ngOnInit() {
    var product_id = null
    this.activatedRoute.params.subscribe( params => product_id = params.id )
    console.log(product_id)
    this.productService.getProduct(product_id).subscribe(
      res => {
        console.log(res)
        this.product = res
      },
      error => console.log(error)
    );
  }

  addToCart(product:Product) {
    var a;
    if (localStorage.getItem('cart') === null) {
      a = [];
    } else {
      a = JSON.parse(localStorage.getItem('cart'));
    }
     
    console.log(a)
    a.push(product);
    localStorage.setItem('cart', JSON.stringify(a));
    this.toast.setMessage('Add to cart!', 'success')
  }

}
