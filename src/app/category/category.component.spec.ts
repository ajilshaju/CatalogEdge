import { ComponentFixture, TestBed, getTestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CategoryComponent } from './category.component';
import { HttpClient } from '@angular/common/http';
import { SortCategoryPipe } from './sort-category.pipe';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';


describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;
  let httpMock: HttpTestingController;
  let pipe: SortCategoryPipe;
  let injector: TestBed;



  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryComponent,SortCategoryPipe],
      imports: [HttpClientTestingModule,FormsModule],
      providers: [CategoryComponent, HttpClient] 

    })

      .compileComponents();
    
    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
   
    

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call refreshList() on ngOnInit', () => {
      spyOn(component, 'refreshList'); // Spy on the refreshList method
      component.ngOnInit(); // Trigger the ngOnInit method
      expect(component.refreshList).toHaveBeenCalled(); // Verify that refreshList was called
    });
  });
  fdescribe('refreshList()', () => {

    beforeEach(inject([HttpTestingController], (httpTestingController: HttpTestingController) => {
      httpMock = httpTestingController;
      component = TestBed.inject(CategoryComponent);
    }));
  
    afterEach(() => {
      httpMock.verify(); // Verify that there are no outstanding requests after each test
    });

    
    it('should fetch categories from the API', inject([HttpTestingController], (httpTestingController: HttpTestingController) => {
      const mockCategories = [{ id: 1, name: 'Category 1' }, { id: 2, name: 'Category 2' }];
  
      component.refreshList(); // Call the method that makes the HTTP request
      const req = httpMock.match(environment.API_URL + 'category'); // Get all matching requests
    console.log(req)
    expect(req.length).toBe(1); // Ensure only one matching request is found

    req[0].flush(mockCategories); 
  
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          expect(component.category).toEqual(mockCategories); // Check if the component's category property is updated with the mock data
          resolve();
        }, 100); // Add a timeout to ensure enough time for the asynchronous operation to complete
      });
    }));
  });
});
