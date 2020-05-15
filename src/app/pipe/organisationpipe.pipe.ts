import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'organisationpipe'
})
export class OrganisationpipePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value === 120) return 'Quickbooks'
    else if (value === 126) return 'Xero'
    return 'None';
  }

}
