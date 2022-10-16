import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ListMasterHargaComponent} from './list-master-harga.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {IDataHargaModel} from "../master-harga-model";
import {ConfirmDialog, ConfirmDialogModule} from "primeng/confirmdialog";
import {By} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MasterHargaService} from "../master-harga.service";

describe('ListMasterHargaComponent', () => {
  let component: ListMasterHargaComponent;
  let fixture: ComponentFixture<ListMasterHargaComponent>;
  let service: MasterHargaService;

  const mockData = {
    id_harga: 2,
    merk: "samsung",
    type: "SM-998",
    storage: "24 GB",
    harga_estimasi: 5000000,
    harga_grade_a: 4000000,
    harga_grade_b: 3000000,
    harga_grade_c: 2000000
  };

  const mockData2 = {
    id_harga: 0,
    merk: "samsung",
    type: "SM-998",
    storage: "24 GB",
    harga_estimasi: 5000000,
    harga_grade_a: 4000000,
    harga_grade_b: 3000000,
    harga_grade_c: 2000000
  };

  const mockEditData = [{
    id_harga: 2,
    merk: "Samsung",
    type: "SM-998",
    storage: "32 GB",
    harga_estimasi: 5000000,
    harga_grade_a: 4000000,
    harga_grade_b: 3000000,
    harga_grade_c: 2000000
  }];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListMasterHargaComponent],
      imports: [HttpClientTestingModule, ConfirmDialogModule, BrowserAnimationsModule],
      providers: [
        MasterHargaService
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(ListMasterHargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.harga = mockData;
    component.items = mockEditData;
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
    component.items = mockEditData;
    component.totalRecords = mockEditData.length;
    expect(component.findIndexById(3)).toEqual(-1);
  });

  it("findIndexById should be found", () => {
    component.items = mockEditData;
    component.totalRecords = mockEditData.length;
    expect(component.findIndexById(mockData.id_harga)).toBeGreaterThanOrEqual(0);
  });

  it('should call confirm with accept button click', () => {

    let confirmdialog: ConfirmDialog;
    confirmdialog = fixture.debugElement.query(By.css('p-confirmdialog')).componentInstance;

    let accept = spyOn(confirmdialog, "accept").and.callThrough();
    component.deleteData(mockData);
    fixture.detectChanges();
    let acceptBtn = fixture.debugElement.nativeElement.querySelector('.p-confirm-dialog-accept');
    acceptBtn.click();
    component.items = [];
    component.totalRecords = component.items.length;
    expect(component.items).toEqual([]);
    expect(component.totalRecords).toBeLessThanOrEqual(component.items.length);
    expect(component.harga).toBeUndefined();
    expect(accept).toHaveBeenCalled();
  })

  it('should call confirm with no button click', () => {
    let confirmdialog: ConfirmDialog;
    confirmdialog = fixture.debugElement.query(By.css('p-confirmdialog')).componentInstance;
    let reject = spyOn(confirmdialog, "reject").and.callThrough();
    component.deleteData(mockData);
    fixture.detectChanges();
    let cancelBtn = fixture.debugElement.nativeElement.querySelector('.p-confirm-dialog-reject');
    cancelBtn.click();
    expect(reject).toHaveBeenCalled();
    expect(component.items).toBeUndefined();
    expect(component.totalRecords).toBeUndefined();
    expect(component.harga).toBeUndefined();
  });

  it('edit data harga', () => {
    component.harga = mockData;
    component.items = mockEditData;
    component.totalRecords = mockEditData.length;
    component.saveData();
    component.items[component.findIndexById(mockData.id_harga)] = mockData;
    expect(component.items[component.findIndexById(mockData.id_harga)]).toEqual(mockData);
    expect(component.isLoading).toBe(false);
    expect(component.productDialog).toBe(false);
    expect(component.harga).toEqual({});
  });

  it('save data harga', () => {
    component.harga = mockData2;
    component.items = mockEditData;
    component.saveData();
    component.items.push(component.harga);
    component.totalRecords = component.items.length;
    expect(component.totalRecords).toEqual(mockEditData.length);
    expect(component.isLoading).toBe(false);
    expect(component.productDialog).toBe(false);
    expect(component.harga).toEqual({});
  });


});
