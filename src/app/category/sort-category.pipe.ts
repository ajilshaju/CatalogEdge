import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortCategory'
})
export class SortCategoryPipe implements PipeTransform {

  transform(value: any[]): any[] {
    return value.sort((n1, n2) => {
      return n1.CategoryId - n2.CategoryId;
    });
  }

}
