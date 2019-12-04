import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arraytostring'
})
export class ArraytostringPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let data:[] =JSON.parse(value);
    if (data.length > 0)
    {
      return data.join(',');
    }
    
    return 'N/A';
  }
}
