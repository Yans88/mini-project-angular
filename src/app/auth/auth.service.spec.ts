import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AuthService} from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get user info when has jwt', (done: DoneFn) => {
    localStorage.setItem('jwt_token', '123131');
    expect(service.getUserInfo()).toBeTruthy();
    done();
  })

});
