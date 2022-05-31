import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
      name: 'departure'
})
export class DeparturePipe implements PipeTransform {
   transform(value: any[], dept: string): any {
     console.log(dept);
     return value.filter(x=> !dept || x.value[0].split(',').indexOf( dept.toLowerCase())>-1 );
   }
}
