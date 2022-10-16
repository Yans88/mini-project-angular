import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'gradePipe'
})
export class GradePipePipe implements PipeTransform {


  transform(value: string | undefined): any {
    if (value === 'A') {
      return 'success';
    } else if (value === 'B') {
      return 'info';
    } else if (value === 'C') {
      //return this.sanitizer.bypassSecurityTrustHtml('<p-tag severity="warning" value="C"></p-tag>');
      //return '<p-badge value="C" size="large" severity="warning"></p-badge>';
      return 'warning';
    } else {
      return 'danger';
    }

  }


}
