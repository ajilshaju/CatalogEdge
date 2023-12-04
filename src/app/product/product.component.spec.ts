import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';


import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';

import { ProductComponent } from './product.component';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  


  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ProductComponent],
      imports: [HttpClientTestingModule, FormsModule],
      providers: [ProductComponent, HttpClient],
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    component = new ProductComponent(httpClient);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
 
  describe('ngOnInit()', () => {
    it('should call refreshProductList() on ngOnInit() and fetch product and category data', () => {
      component.ngOnInit();

      const productReq = httpMock.expectOne(environment.API_URL + 'product');
      expect(productReq.request.method).toBe('GET');

      const mockProducts = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
      productReq.flush(mockProducts);

      const categoryReq = httpMock.expectOne(environment.API_URL + 'category');
      expect(categoryReq.request.method).toBe('GET');

      const mockCategories = [{ id: 1, name: 'Category 1' }, { id: 2, name: 'Category 2' }];
      categoryReq.flush(mockCategories);

      expect(component.product).toEqual(mockProducts);
      expect(component.category).toEqual(mockCategories);
    });
  });
  describe('addClick()', () => {
    it('should initialize properties for adding a product', () => {
      component.addClick();
      expect(component.modalTitle).toBe('Add Product');
      expect(component.ProductId).toBe(0);
      expect(component.Name).toBe('');
      expect(component.Description).toBe('');
      expect(component.Category).toBe('');
      expect(component.Price).toBe('');
      expect(component.Colour).toBe('');
    });
  });

  describe('editClick()', () => {
    it('should set properties for editing a product', () => {
      const mockProduct = {
        ProductId: 1,
        Name: 'Sample Product',
        Description: 'Sample Description',
        Category: 'Sample Category',
        Price: '10',
        Colour: 'Sample Colour'
      };

      component.editClick(mockProduct);
      expect(component.modalTitle).toBe('Edit Product');
      expect(component.ProductId).toBe(mockProduct.ProductId);
      expect(component.Name).toBe(mockProduct.Name);
      expect(component.Description).toBe(mockProduct.Description);
      expect(component.Category).toBe(mockProduct.Category);
      expect(component.Price).toBe(mockProduct.Price);
      expect(component.Colour).toBe(mockProduct.Colour);
    });
  });

  describe('createClick()', () => {
    it('should create a product and refresh the product list', () => {
      const mockProduct = {
        Name: 'New Product',
        Description: 'Product Description',
        Category: 'Product Category',
        Price: '25',
        Colour: 'Product Colour'
      };

      component.Name = mockProduct.Name;
      component.Description = mockProduct.Description;
      component.Category = mockProduct.Category;
      component.Price = mockProduct.Price;
      component.Colour = mockProduct.Colour;
      component.createClick();

      const req = httpMock.expectOne(environment.API_URL + 'product');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockProduct);

      req.flush('Product created successfully');

      const refreshReq = httpMock.expectOne(environment.API_URL + 'product');
      expect(refreshReq.request.method).toBe('GET');

      const mockProductList = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
      refreshReq.flush(mockProductList);

      expect(component.product).toEqual(mockProductList);
    });
  });

  describe('updateClick()', () => {
    it('should update a product and refresh the product list', () => {
      component.ProductId = 1;
      component.Name = 'Updated Product';
      component.Description = 'Updated Description';
      component.Category = 'Updated Category';
      component.Price = '30';
      component.Colour = 'Updated Colour';

      component.updateClick();

      const req = httpMock.expectOne(environment.API_URL + 'product');
      expect(req.request.method).toBe('PUT');

      req.flush('Product updated successfully');

      const refreshReq = httpMock.expectOne(environment.API_URL + 'product');
      expect(refreshReq.request.method).toBe('GET');

      const mockProductList = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
      refreshReq.flush(mockProductList);

      expect(component.product).toEqual(mockProductList);
    });
  });

  describe('deleteClick()', () => {
    it('should delete a product and refresh the product list if user confirms', () => {
  
      spyOn(window, 'confirm').and.returnValue(true);

      const productId = 1;

      component.deleteClick(productId);

      const req = httpMock.expectOne(environment.API_URL + 'product/' + productId);
      expect(req.request.method).toBe('DELETE');

      req.flush('Product deleted successfully');

      const refreshReq = httpMock.expectOne(environment.API_URL + 'product');
      expect(refreshReq.request.method).toBe('GET');

      const mockProductList = [{ id: 2, name: 'Product 2' }, { id: 3, name: 'Product 3' }];
      refreshReq.flush(mockProductList);

      expect(component.product).toEqual(mockProductList);
    });
  });
  
});
