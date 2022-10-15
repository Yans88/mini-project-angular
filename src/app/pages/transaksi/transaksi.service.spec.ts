import {TestBed} from '@angular/core/testing';

import {TransaksiService} from './transaksi.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {TransaksiModel} from "./transaksi-model";


describe('TransaksiService', () => {
  let service: TransaksiService;

  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(TransaksiService);
    httpTestingController = TestBed.inject(HttpTestingController);
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getData should return expected data transaksi', (done) => {
    let expectedData: TransaksiModel = {
      current_page: 0,
      data: [],
      message: "",
      next: false,
      page_size: 0,
      previous: false,
      total_pages: 0,
      total_data: 10
    };
    service.getData(1, 0, 10, 'idTransaksi', 1, '').subscribe((data: TransaksiModel) => {
      expect(data.total_data).toBeLessThanOrEqual(10);
      done();
    });
    const testRequest = httpTestingController.expectOne('http://localhost:8080/mini-project/api/transaksi?status=1&page=0&size=10&sort_column=idTransaksi&sort_order=asc&email_phone=');
    testRequest.flush(expectedData);
  });

  it('getData should use GET to retrieve data transaksi', () => {
    service.getData(1, 0, 10, 'idTransaksi', 1, '').subscribe();
    const testRequest = httpTestingController.expectOne("http://localhost:8080/mini-project/api/transaksi?status=1&page=0&size=10&sort_column=idTransaksi&sort_order=asc&email_phone=");
    expect(testRequest.request.method).toEqual('GET');
  });

  it("should throw error", () => {
    let error: string;
    service.getData(2, 0, 10, 'idTransaksi', 1, '').subscribe(null, e => {
      error = e;
    });

    let req = httpTestingController.expectOne("http://localhost:8080/mini-project/api/transaksi?status=2&page=0&size=10&sort_column=idTransaksi&sort_order=asc&email_phone=");
    req.flush("Data not found", {
      status: 404,
      statusText: "Network error"
    });
    expect(error!.toString().indexOf("Data not found") >= 0).toBeFalsy();
  });

});
