import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})

export class CategoryComponent implements OnInit {

  constructor(private http: HttpClient) { }

  category: any = [];

  modalTitle = "";
  CategoryId = 0;
  Name = "";
  Description = "";



  ngOnInit(): void {
    this.refreshList();
  }

  refreshList() 
  {
    this.http.get<any>(environment.API_URL + 'category')
      .subscribe(data => {
        this.category = data;
      
      });

  }

  addClick() {
    this.modalTitle = "Add Category";
    this.CategoryId = 0;
    this.Name = "";
    this.Description = "";
  }

  editClick(cat: any) {
    this.modalTitle = "Edit Category";
    this.CategoryId = cat.CategoryId;
    this.Name = cat.Name;
    this.Description = cat.Description;
  }

  createClick() {
    var val = {
      Name: this.Name,
      Description: this.Description
    };

    this.http.post(environment.API_URL + 'category', val)
      .subscribe(res => {
        alert(res.toString());
        this.refreshList();
      });
  }

  updateClick() {
    var val = {
      CategoryId: this.CategoryId,
      Name: this.Name,
      Description: this.Description
    };

    this.http.put(environment.API_URL + 'category', val)
      .subscribe(res => {
        alert(res.toString());
        this.refreshList();
      });
  }

  deleteClick(id: any) {
    if (confirm('Are you sure?')) {
      this.http.delete(environment.API_URL + 'category/' + id)
        .subscribe(res => {
          alert(res.toString());
          this.refreshList();
        });
    }
  }


}


