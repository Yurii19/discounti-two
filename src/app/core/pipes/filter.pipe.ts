import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(values: any, inputValue: string): string {
    const filterValue = inputValue?.toLowerCase();
    return values?.map((value: any) => value.name)
                  .filter((value: string) => value.toLowerCase().includes(filterValue))
  };
  
}
