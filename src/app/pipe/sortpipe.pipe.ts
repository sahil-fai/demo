import { Pipe, PipeTransform } from '@angular/core';
import { pipe } from 'rxjs';
import { UpperCasePipe } from '@angular/common';

@Pipe({
  name: 'shortpipe'
})

export class SortpipePipe implements PipeTransform {
  // rajan = 'jhbdsaj askjbdja';
  // utshah = 'jhbdsaj askjbdja';
  // todaydate = new Date();

  transform(val: string): string {
    //console.log(val)
    const split = val.split('').join('');
    const extract = split.substring(0, 4) + '....' + split.slice(-4);
    //console.log(extract);
    return(extract);
  }
}
