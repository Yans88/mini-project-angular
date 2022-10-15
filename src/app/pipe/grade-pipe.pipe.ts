import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'gradePipe'
})
export class GradePipePipe implements PipeTransform {

  transform(value: string): any {
    if (value === 'A') {
      return '<p-tag severity="success" value="A"></p-tag>';
    } else if (value === 'B') {
      return '<p-tag severity="info" value="B"></p-tag>';
    } else if (value === 'C') {
      return '<p-tag severity="warning" value="C"></p-tag>';
    } else {
      return '<p-tag severity="danger" value="Reject"></p-tag>';
    }
  }

}
