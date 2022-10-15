import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ListMasterHargaComponent} from './list-master-harga.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {IDataHargaModel} from "../master-harga-model";
import {ConfirmDialog, ConfirmDialogModule} from "primeng/confirmdialog";
import {By} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('ListMasterHargaComponent', () => {
  let component: ListMasterHargaComponent;
  let fixture: ComponentFixture<ListMasterHargaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListMasterHargaComponent],
      imports: [HttpClientTestingModule, ConfirmDialogModule, BrowserAnimationsModule],

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

  it('should call confirm with accept button click', () => {
    let deleteData: IDataHargaModel = {
      id_harga: 2
    };
    let confirmdialog: ConfirmDialog;
    confirmdialog = fixture.debugElement.query(By.css('p-confirmdialog')).componentInstance;

    let accept = spyOn(confirmdialog, "accept").and.callThrough();
    component.deleteData(deleteData);
    fixture.detectChanges();
    let acceptBtn = fixture.debugElement.nativeElement.querySelector('.p-confirm-dialog-accept');
    acceptBtn.click();

    expect(component.items).toBeUndefined();
    expect(component.totalRecords).toBeUndefined();
    expect(component.harga).toBeUndefined();
    expect(accept).toHaveBeenCalled();
  })

  it('should call confirm with no button click', () => {
    let deleteData: IDataHargaModel = {
      id_harga: 2
    };
    let confirmdialog: ConfirmDialog;
    confirmdialog = fixture.debugElement.query(By.css('p-confirmdialog')).componentInstance;
    let reject = spyOn(confirmdialog, "reject").and.callThrough();
    component.deleteData(deleteData);
    fixture.detectChanges();
    let cancelBtn = fixture.debugElement.nativeElement.querySelector('.p-confirm-dialog-reject');
    cancelBtn.click();
    expect(reject).toHaveBeenCalled();
    expect(component.items).toBeUndefined();
    expect(component.totalRecords).toBeUndefined();
    expect(component.harga).toBeUndefined();
  });


});
