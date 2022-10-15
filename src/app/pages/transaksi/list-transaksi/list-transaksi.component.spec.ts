import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ListTransaksiComponent} from './list-transaksi.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MessageService} from "primeng/api";
import {IDataTransaksiModel} from "../transaksi-model";


describe('ListTransaksiComponent', () => {
  let component: ListTransaksiComponent;
  let fixture: ComponentFixture<ListTransaksiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListTransaksiComponent],
      imports: [HttpClientTestingModule],
      providers: [MessageService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ListTransaksiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("get data transaksi component", () => {
    component.getData();
    console.log(component.isLoading);
    expect(component.isLoading).toEqual(true);
  });

  it("transaksiDialog should be false", () => {
    component.transaksiDialog = true;

    component.hideDialog();
    expect(component.transaksiDialog).toEqual(false);
    expect(component.isLoading).toEqual(false);
    expect(component.isBtnLoading).toEqual(false);
  });

  it("transaksiDialog should be true when clicked row", () => {
    let editData: IDataTransaksiModel = {
      id_transaksi: 2
    };
    //component.transaksiDialog = false;
    component.onRowSelect(editData);
    expect(component.transaksiDialog).toEqual(true);
    expect(component.isLoading).toEqual(false);
    expect(component.isBtnLoading).toEqual(false);
    //expect(component.titleDialog).toEqual("Detail Transaksi #" + editData.id_transaksi);
    //expect(component.selectedData?.id_transaksi).toBeGreaterThanOrEqual(1);
  });

});
