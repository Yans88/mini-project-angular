import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AuthService} from './auth.service';
import {IDataHargaModel} from "../pages/master-harga/master-harga-model";
import {ILogin} from "./login.model";

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('get user info when has jwt', (done: DoneFn) => {
    localStorage.setItem('jwt_token', '123131');
    expect(service.getUserInfo()).toBeTruthy();
    done();
  });

  it('create should make a POST HTTP request on login', () => {
    let postData: ILogin = {
      username: 'admin',
      password: 'SM-887'
    }
    service.login(postData).subscribe(res => {
      expect(res.data.username).toEqual(postData.username);
    });
    const req = httpTestingController.expectOne('http://localhost:8080/mini-project/api/signin', 'post to api');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(postData);
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    let payload = {data: postData};
    req.flush(payload);
    httpTestingController.verify();
  });

});
