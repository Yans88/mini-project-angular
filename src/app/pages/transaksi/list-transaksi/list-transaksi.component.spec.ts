import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ListTransaksiComponent} from './list-transaksi.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MessageService} from "primeng/api";

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
    expect(component.isLoading).toEqual(true);
  });

  it("transaksiDialog should be false", () => {
    component.transaksiDialog = true;
    component.hideDialog();
    expect(component.transaksiDialog).toEqual(false);
    expect(component.isBtnLoading).toEqual(false);
  });

  it("transaksiDialog should be true when clicked row", () => {
    let data = {id_transaksi: 2};
    let editData = {data};
    component.transaksiDialog = false;
    component.onRowSelect(editData);
    expect(component.transaksiDialog).toEqual(true);
    expect(component.isBtnLoading).toEqual(false);
    expect(component.titleDialog).toEqual("Detail Transaksi #" + editData.data.id_transaksi);
    expect(component.selectedData?.id_transaksi).toBeGreaterThanOrEqual(1);
  });

  it("isBtnLoading should be true when clicked button approve or reject", () => {
    component.approveTransaksi(1, 2);
    expect(component.isBtnLoading).toEqual(true);
  });

  it("Test title", () => {
    component.ngOnInit();
    if (component.href === 'approve') {
      expect(component.title).toEqual('Onproses');
    } else if (component.href === 'reject') {
      expect(component.title).toEqual('Ditolak');
    } else if (component.href === 'cancel') {
      expect(component.title).toEqual('Cancel');
    } else {
      expect(component.title).toEqual('New Transaksi');
    }
  });

  it("Test lazy load loadDataLazy", () => {
    let event = {
      first: 1,
      rows: 10,
      globalFilter: '',
      sortField: 'merk',
      sortOrder: 1
    }
    component.loadDataLazy(event);
    expect(component.first).toBe(event.first);
    expect(component.rows).toBe(event.rows);
    expect(component.globalFilter).toBe(event.globalFilter);
    expect(component.sortField).toBe(event.sortField);
    expect(component.sortOrder).toBe(event.sortOrder);
  });

});
