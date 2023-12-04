import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  constructor(private http: HttpClient) { }

  category: any = [];
  product: any = [];

  modalTitle = "";
  ProductId = 0;
  Name = "";
  Description = "";
  Category = "";
  Price = "";
  Colour = "";


  ngOnInit(): void {
    this.refreshProductList();
  }

  refreshProductList() {
    this.http.get<any>(environment.API_URL + 'product')
      .subscribe(data => {
        this.product = data;
      });

    this.http.get<any>(environment.API_URL + 'category')
      .subscribe(data => {
        this.category = data;
      });
  }

  addClick() {
    this.modalTitle = "Add Product";
    this.ProductId = 0;
    this.Name = "";
    this.Description = "";
    this.Category = "";
    this.Price = "";
    this.Colour = "";
  }

  editClick(prod: any) {
    this.modalTitle = "Edit Product";
    this.ProductId = prod.ProductId;
    this.Name = prod.Name;
    this.Description = prod.Description;
    this.Category = prod.Category;
    this.Price = prod.Price;
    this.Colour = prod.Colour;
  }

  createClick() {
    var val = {
      Name: this.Name,
      Description: this.Description,
      Category: this.Category,
      Price: this.Price,
      Colour: this.Colour
    };

    this.http.post(environment.API_URL + 'product', val)
      .subscribe(res => {
        alert(res.toString());
        this.refreshProductList();
      });
  }

  updateClick() {
    var val = {
      ProductId: this.ProductId,
      Name: this.Name,
      Description: this.Description,
      Category: this.Category,
      Price: this.Price,
      Colour: this.Colour
    };

    this.http.put(environment.API_URL + 'product', val)
      .subscribe(res => {
        alert(res.toString());
        this.refreshProductList();
      });
  }

  deleteClick(id: any) {
    if (confirm('Are you sure?')) {
      this.http.delete(environment.API_URL + 'product/' + id)
        .subscribe(res => {
          alert(res.toString());
          this.refreshProductList();
        });
    }
  }

  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const regex = /^[0-9]*$/; 

    if (!regex.test(input.value)) {
      input.value = input.value.replace(/[^0-9]/g, ''); 
      this.Price = input.value; // 
    }

  }
}





