import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addresstype'
})
export class AddresstypePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value === 1) return 'Address(Office)'
    else if (value === 3) return 'Legal Address'
    else if (value ==2) return 'Customer Face Address'
    return 'Address';
  }

}
