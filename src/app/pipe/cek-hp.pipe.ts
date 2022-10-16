import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Pipe({
  name: 'cekHP'
})
export class CekHPPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {
  }

  transform(value: number | undefined): any {
    if (value === 1) {
      return this.sanitizer.bypassSecurityTrustHtml('<div class="flex align-items-center justify-content-center bg-green-500 border-circle cek-hp-grade" style="height: 1.4rem;width: 1.4rem;"><i class="pi pi-check font-medium text-black-alpha-90 text-sm"></i></div>');
    } else {
      return this.sanitizer.bypassSecurityTrustHtml('<div class="flex align-items-center justify-content-center bg-red-400 border-circle cek-hp-grade" style="height: 1.4rem;width: 1.4rem;"><i class="pi pi-times font-medium text-white-alpha-90 text-sm"></i></div>');
    }
  }

}


