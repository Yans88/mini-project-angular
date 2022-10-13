import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from "@angular/router/testing";
import {LoginComponent} from './login.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let btnEl: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, FormsModule, RouterTestingModule, HttpClientTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    btnEl = fixture.debugElement.query(By.css('button'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Update tombol login menjadi true', () => {
    component.isLoading = true; // false
    fixture.detectChanges()
    expect(btnEl.nativeElement.isLoading).toBeFalsy();
  })

  it('form invalid ketika kosong', () => {
    expect(component.loginForm.valid).toBeFalsy()
  })

  it('form invalid username empty', () => {
    component.loginForm.setValue({
      username: '',
      password: '123123',
    })
    expect(component.loginForm.valid).toBeFalsy()
  })

  it('form invalid password empty', () => {
    component.loginForm.setValue({
      username: 'yansen@gmail.com',
      password: '',
    })
    expect(component.loginForm.valid).toBeFalsy()
  })

  it('form valid', () => {
    component.loginForm.setValue({
      username: 'yansen@gmail.com',
      password: '123123',
    })
    expect(component.loginForm.valid).toBeTruthy()
  })


});
