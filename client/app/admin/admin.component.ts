import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { OrderService } from '../services/order.service';

import { User } from '../shared/models/user.model';
import { Product } from '../shared/models/product.model';
import { Category } from '../shared/models/category.model';
import { Order } from '../shared/models/order.model';

import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {

  product = new Product();
  category = new Category();
  categories: Category[] = [];
  products: Product[] = [];
  orders: Order[] = [];
  users: User[] = [];
  isLoading = true;
  isEditingProduct = false;
  isEditingCategory = false;

  addProductForm: FormGroup;
  name = new FormControl('', Validators.required);
  price = new FormControl('', Validators.required);
  image = new FormControl('', Validators.required);
  category_id = new FormControl('', Validators.required);

  addCategoryForm: FormGroup;

  constructor(public auth: AuthService,
              public toast: ToastComponent,
              private userService: UserService,
              private productService: ProductService,
              private categoryService: CategoryService,
              private orderService: OrderService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getProducts();
    this.getCategories();
    this.getUsers();
    this.getOrders();
    this.addProductForm = this.formBuilder.group({
      name: this.name,
      price: this.price,
      image: this.image,
      category_id: this.category_id
    });
    this.addCategoryForm = this.formBuilder.group({
      name: this.name
    });
  }

  getOrders() {
    this.orderService.getOrders().subscribe(
      data => {
        this.orders = data;
        console.log(data)
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

  addCategory() {
    this.categoryService.addCategory(this.addCategoryForm.value).subscribe(
      res => {
        this.categories.push(res);
        this.addCategoryForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  enableEditingCategory(category: Category) {
    this.isEditingCategory = true;
    this.category = category;
  }

  cancelEditingCategory() {
    this.isEditingCategory = false;
    this.category = new Category();
    this.toast.setMessage('item editing cancelled.', 'warning');
  }

  editCategory(category: Category) {
    this.categoryService.editCategory(category).subscribe(
      () => {
        this.isEditingCategory = false;
        this.category = category;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteCategory(category: Category) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.categoryService.deleteCategory(category).subscribe(
        () => {
          const pos = this.categories.map(elem => elem._id).indexOf(category._id);
          this.categories.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

  getProducts() {
    this.productService.getProducts().subscribe(
      data => this.products = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addProduct() {
    this.productService.addProduct(this.addProductForm.value).subscribe(
      res => {
        this.products.push(res);
        this.addProductForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  enableEditingProduct(product: Product) {
    this.isEditingProduct = true;
    this.product = product;
  }

  cancelEditingProduct() {
    this.isEditingProduct = false;
    this.product = new Product();
    this.toast.setMessage('item editing cancelled.', 'warning');
    this.getProducts();
  }

  editProduct(product: Product) {
    this.productService.editProduct(product).subscribe(
      () => {
        this.isEditingProduct = false;
        this.product = product;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteProduct(product: Product) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.productService.deleteProduct(product).subscribe(
        () => {
          const pos = this.products.map(elem => elem._id).indexOf(product._id);
          this.products.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      data => this.users = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  deleteUser(user: User) {
    if (window.confirm('Are you sure you want to delete ' + user.username + '?')) {
      this.userService.deleteUser(user).subscribe(
        data => this.toast.setMessage('user deleted successfully.', 'success'),
        error => console.log(error),
        () => this.getUsers()
      );
    }
  }

}
