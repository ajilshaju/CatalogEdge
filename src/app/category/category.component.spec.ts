import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { CategoryComponent } from './category.component';
import { HttpClient } from '@angular/common/http';
import { SortCategoryPipe } from './sort-category.pipe';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';

describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [CategoryComponent, SortCategoryPipe],
      imports: [HttpClientTestingModule, FormsModule],
      providers: [CategoryComponent, HttpClient],
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    component = new CategoryComponent(httpClient);
  });

  afterEach(() => {
    httpMock.verify(); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
   
    it('should call refreshList() on ngOnInit', () => {
      spyOn(component, 'refreshList'); 
      component.ngOnInit(); 
      expect(component.refreshList).toHaveBeenCalled(); 
     
      httpMock.verify();
      
    });

    it('should call refreshList on ngOnInit and fetch categories', () => {
      const mockCategories = [
        { id: 1, name: 'Category 1', description: 'Data for Category 1' },
        { id: 2, name: 'Category 2', description: 'Data for Category 2' },
      ];

      component.ngOnInit(); 

      const req = httpMock.expectOne(environment.API_URL + 'category');

      expect(req.request.method).toBe('GET'); 
      req.flush(mockCategories);
      expect(component.category).toEqual(mockCategories); 
      httpMock.verify();  
    });  
  });

  describe('addClick()', () => {
    it('should reset modal properties on addClick()', () => {
      component.modalTitle = 'Initial Title';
      component.CategoryId = 123;
      component.Name = 'Initial Name';
      component.Description = 'Initial Description';

      component.addClick();
      expect(component.modalTitle).toBe('Add Category');
      expect(component.CategoryId).toBe(0);
      expect(component.Name).toBe('');
      expect(component.Description).toBe('');
    });
  });


  describe('editClick()', () => {
    it('should set modal properties when editing a category', () => {
      const mockCategory = {
        CategoryId: 1,
        Name: 'Category Name',
        Description: 'Category Description'
      };
      component.editClick(mockCategory);
      expect(component.modalTitle).toBe('Edit Category');
      expect(component.CategoryId).toBe(mockCategory.CategoryId);
      expect(component.Name).toBe(mockCategory.Name);
      expect(component.Description).toBe(mockCategory.Description);
    });
    
  });

  describe('createClick()', () => {
    afterEach(() => {
      httpMock.verify(); 
    });
    it('should perform POST and GET requests on createClick()', () => {
      const mockCategory = {
        Name: 'Test Category',
        Description: 'Test Description'
      };
      component.Name = mockCategory.Name;
      component.Description = mockCategory.Description;

      component.createClick();
      const postReq = httpMock.expectOne(environment.API_URL + 'category');
      expect(postReq.request.method).toBe('POST');
      expect(postReq.request.body).toEqual(mockCategory);
      postReq.flush('New category created successfully');
      const getReq = httpMock.expectOne(environment.API_URL + 'category');
      expect(getReq.request.method).toBe('GET');
      const mockData = [{ id: 1, name: 'Category 1' }, { id: 2, name: 'Category 2' }];

      getReq.flush(mockData);

      expect(component.category).toEqual(mockData);
    });
  });

  describe('updateClick()', () => {
    it('should perform PUT and GET requests on updateClick()', () => {
      const mockUpdatedCategory = {
        CategoryId: 1,
        Name: 'Updated Category',
        Description: 'Updated Description'
      };

      component.CategoryId = mockUpdatedCategory.CategoryId;
      component.Name = mockUpdatedCategory.Name;
      component.Description = mockUpdatedCategory.Description;

      component.updateClick();

      const putReq = httpMock.expectOne(environment.API_URL + 'category');
      expect(putReq.request.method).toBe('PUT');
      expect(putReq.request.body).toEqual(mockUpdatedCategory);

      putReq.flush('Category updated successfully');

      const getReq = httpMock.expectOne(environment.API_URL + 'category');
      expect(getReq.request.method).toBe('GET');

      const mockData = [{ id: 1, name: 'Category 1' }, { id: 2, name: 'Category 2' }];
      getReq.flush(mockData);

      expect(component.category).toEqual(mockData);
    });
  });

  describe('deleteClick()', () => {
    it('should perform DELETE and GET requests on deleteClick()', () => {
      spyOn(window, 'confirm').and.returnValue(true);

      const categoryIdToDelete = 1;

      component.deleteClick(categoryIdToDelete);
      const deleteReq = httpMock.expectOne(environment.API_URL + 'category/' + categoryIdToDelete);
      expect(deleteReq.request.method).toBe('DELETE');

      deleteReq.flush('Category deleted successfully');

      const getReq = httpMock.expectOne(environment.API_URL + 'category');

      expect(getReq.request.method).toBe('GET');
      const mockData = [{ id: 2, name: 'Category 2' }, { id: 3, name: 'Category 3' }];
      getReq.flush(mockData);

      expect(component.category).toEqual(mockData);
    });
  });
});
