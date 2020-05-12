import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transactionTypePipe'
})
export class TransactionTypePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value === 149) return 'Submit'
    else if (value === 266) return 'Update'
    return 'None';
  }

}