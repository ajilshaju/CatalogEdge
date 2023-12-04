import { SortCategoryPipe } from './sort-category.pipe';


  describe('SortCategoryPipe', () => {
    let pipe: SortCategoryPipe;
  
    beforeEach(() => {
      pipe = new SortCategoryPipe();
    });
    it('create an instance', () => {
      expect(pipe).toBeTruthy();
    });
  
    it('should sort categories by CategoryId in ascending order', () => {
      const unsortedCategories = [
        { CategoryId: 3, name: 'Category C' },
        { CategoryId: 1, name: 'Category A' },
        { CategoryId: 2, name: 'Category B' }
      ];
  
      const sortedCategories = pipe.transform(unsortedCategories);
  
      expect(sortedCategories).toBeDefined();
      expect(sortedCategories.length).toBe(3);
      expect(sortedCategories[0].CategoryId).toBe(1);
      expect(sortedCategories[1].CategoryId).toBe(2);
      expect(sortedCategories[2].CategoryId).toBe(3);
    });
  
    it('should return an empty array for empty input', () => {
      const emptyArray: any[] = [];
      const sortedCategories = pipe.transform(emptyArray);
  
      expect(sortedCategories).toBeDefined();
      expect(sortedCategories.length).toBe(0);
    });
  
  });
