import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ListMasterHargaComponent} from './list-master-harga.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ListMasterHargaComponent', () => {
  let component: ListMasterHargaComponent;
  let fixture: ComponentFixture<ListMasterHargaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListMasterHargaComponent],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ListMasterHargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
