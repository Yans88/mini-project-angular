import {CekHPPipe} from './cek-hp.pipe';
import {inject} from "@angular/core/testing";
import {DomSanitizer} from "@angular/platform-browser";

describe('CekHPPipe', () => {
  it('create an instance', inject([DomSanitizer], (sanitizer: DomSanitizer) => {
    const pipe = new CekHPPipe(sanitizer);
    expect(pipe).toBeTruthy();
  }));

  it('transforms Value 1', inject([DomSanitizer], (sanitizer: DomSanitizer) => {
    const pipe = new CekHPPipe(sanitizer);
    const result = pipe.transform(1);
    const expected = sanitizer.bypassSecurityTrustHtml('<div class="flex align-items-center justify-content-center bg-green-500 border-circle cek-hp-grade" style="height: 1.4rem;width: 1.4rem;"><i class="pi pi-check font-medium text-black-alpha-90 text-sm"></i></div>');
    expect(result).toEqual(expected);
  }));

  it('transforms Value other 1', inject([DomSanitizer], (sanitizer: DomSanitizer) => {
    const pipe = new CekHPPipe(sanitizer);
    const result = pipe.transform(0);
    const expected = sanitizer.bypassSecurityTrustHtml('<div class="flex align-items-center justify-content-center bg-red-400 border-circle cek-hp-grade" style="height: 1.4rem;width: 1.4rem;"><i class="pi pi-times font-medium text-white-alpha-90 text-sm"></i></div>');
    expect(result).toEqual(expected);
  }));


});
