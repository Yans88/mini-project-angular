import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ListMasterHargaComponent} from './list-master-harga.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {IDataHargaModel} from "../master-harga-model";

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

  it("productDialog should be true", () => {
    component.productDialog = false;
    component.openNew();
    expect(component.productDialog).toEqual(true);
    expect(component.harga).toEqual({});
    expect(component.submitted).toEqual(false);
  });

  it("productDialog should be false", () => {
    component.productDialog = true;
    component.submitted = true;
    component.hideDialog();
    expect(component.productDialog).toEqual(false);
    expect(component.submitted).toEqual(false);
  });

  it("productDialog should be true when edit", () => {
    let editData: IDataHargaModel = {
      id_harga: 2
    };
    component.productDialog = true;
    component.submitted = true;
    component.editData(editData);
    expect(component.productDialog).toEqual(true);
    expect(component.harga.id_harga).toBeGreaterThanOrEqual(1);
  });

  it("get data", () => {
    component.getData({});
    expect(component.isLoading).toEqual(true);
  });

  it("findIndexById should be wrong", () => {
    expect(component.findIndexById(3)).toEqual(-1);
  });

});
