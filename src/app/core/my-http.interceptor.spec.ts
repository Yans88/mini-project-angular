import {TestBed} from '@angular/core/testing';

import {MyHttpInterceptor} from './my-http.interceptor';
import {MessageService} from "primeng/api";

describe('MyHttpInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      MyHttpInterceptor,
      MessageService
    ]
  }));

  it('should be created', () => {
    const interceptor: MyHttpInterceptor = TestBed.inject(MyHttpInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
