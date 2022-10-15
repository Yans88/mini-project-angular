import {TestBed} from '@angular/core/testing';

import {MasterHargaService} from './master-harga.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {MasterHargaModel} from "./master-harga-model";

describe('MasterHargaService', () => {
  let service: MasterHargaService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(MasterHargaService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getData should use GET to retrieve data master harga', () => {
    service.getData({}).subscribe();

    const testRequest = httpTestingController.expectOne("http://localhost:8080/mini-project/api/master_harga?page=0&size=10&sort_column=merk&sort_order=asc&keyword=");

    expect(testRequest.request.method).toEqual('GET');
  });

  it('getData should return expected data master harga', (done) => {
    let expectedData: MasterHargaModel = {
      current_page: 0,
      data: [],
      message: "",
      next: false,
      page_size: 0,
      previous: false,
      total_pages: 0,
      total_data: 10
    };
    service.getData({}).subscribe((data: MasterHargaModel) => {
      expect(data.total_data).toBeLessThanOrEqual(10);
      done();
    });
    const testRequest = httpTestingController.expectOne('http://localhost:8080/mini-project/api/master_harga?page=0&size=10&sort_column=merk&sort_order=asc&keyword=');
    testRequest.flush(expectedData);
  });

  it("should throw error", () => {
    let error: string;
    service.getData({globalFilter: 'klx.a'}).subscribe(null, e => {
      error = e;
    });

    let req = httpTestingController.expectOne("http://localhost:8080/mini-project/api/master_harga?page=0&size=10&sort_column=merk&sort_order=asc&keyword=klx.a");
    req.flush("Data not found", {
      status: 404,
      statusText: "Network error"
    });
    expect(error!.toString().indexOf("Data not found") >= 0).toBeFalsy();
  });

});
