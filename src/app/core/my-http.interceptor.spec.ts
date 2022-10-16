import {inject, TestBed} from '@angular/core/testing';

import {MyHttpInterceptor} from './my-http.interceptor';
import {MessageService} from "primeng/api";
import {HTTP_INTERCEPTORS, HttpClient} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {ILogin} from "../auth/login.model";

describe('MyHttpInterceptor', () => {

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [
      MyHttpInterceptor,
      MessageService,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: MyHttpInterceptor,
        multi: true
      }
    ]
  }));

  it('should be created', () => {
    const interceptor: MyHttpInterceptor = TestBed.inject(MyHttpInterceptor);
    expect(interceptor).toBeTruthy();
  });

  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    //httpMock.verify();
    TestBed.resetTestingModule();
  }));

  afterAll(() => {
    TestBed.resetTestingModule();
  });

  it('adds Authorization header', inject([HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
    localStorage.setItem('jwt_token', '123131');
    http.get('http://localhost:8080/mini-project/api/master_harga?page=2&size=10&keyword=&sort_column=hargaGradeA&sort_order=DESC').subscribe(
      response => {
        expect(response).toBeTruthy();
      }
    );
    const req = httpMock.expectOne(r =>
      r.headers.has('Authorization') &&
      r.headers.get('Authorization') === `Bearer 123131`);
    expect(req.request.method).toEqual('GET');

    req.flush({hello: 'world'});
    httpMock.verify();
  }));


  it('cek Authorization header', inject([HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
    localStorage.setItem('jwt_token', '');
    let postData: ILogin = {
      username: 'admin',
      password: 'SM-887'
    }
    http.post('http://localhost:8080/mini-project/api/signin', postData).subscribe(
      response => {
        expect(response).toBeTruthy();
      }
    );
    const req = httpMock.expectOne(r =>
      r.headers.has('Authorization') &&
      r.headers.get('Authorization') === ``);
    expect(req.request.method).toEqual('POST');

    req.flush({hello: 'world'});
    httpMock.verify();
  }));


});

