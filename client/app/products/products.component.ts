import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Product } from '../shared/models/product.model';
import { Category } from '../shared/models/category.model';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  product = new Product();
  categories: Category[] = [];
  products: Product[] = [];
  isLoading = true;
  isEditing = false;

  addProductForm: FormGroup;
  name = new FormControl('', Validators.required);
  price = new FormControl('', Validators.required);
  image = new FormControl('', Validators.required);
  category_id = new FormControl('', Validators.required);

  constructor(private productService: ProductService,
              private categoryService: CategoryService,
              private formBuilder: FormBuilder,
              public toast: ToastComponent,
              public auth: AuthService ) { }

  ngOnInit() {
    this.getProducts();
    this.getCategories();
    this.addProductForm = this.formBuilder.group({
      name: this.name,
      price: this.price,
      image: this.image,
      category_id: this.category_id
    });
  }

  filterCategory(filterCategory: Category) {
    this.productService.getProducts().subscribe(
      data => {
        var filterProduct = []
        console.log(data)
        data.forEach(product => {
          if (product["category"]._id === filterCategory._id) {
            filterProduct.push(product)
          }
        });
        this.products = filterProduct
      },
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  getCategories() {
    this.categoryService.getCategorys().subscribe(
      data => {
        this.categories = data;
      },
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  getProducts() {
    this.productService.getProducts().subscribe(
      data => this.products = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }
}
