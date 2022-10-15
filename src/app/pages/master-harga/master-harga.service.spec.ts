import {TestBed} from '@angular/core/testing';

import {MasterHargaService} from './master-harga.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {IDataHargaModel, MasterHargaModel} from "./master-harga-model";

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

  it('getData should use DELETE to delete data master harga', () => {
    service.deleteData(2).subscribe();
    const testRequest = httpTestingController.expectOne("http://localhost:8080/mini-project/api/master_harga/2");
    expect(testRequest.request.method).toEqual('DELETE');
  });

  it('create should make a POST HTTP request with resource as body', () => {
    let postData: IDataHargaModel = {
      merk: 'Samsung',
      type: 'SM-887',
      storage: '32 GB',
      harga_estimasi: 8000000,
      harga_grade_a: 7000000,
      harga_grade_b: 6000000,
      harga_grade_c: 5000000
    }
    service.postData(postData).subscribe(res => {
      expect(res.payload).toEqual(postData);
    });
    const req = httpTestingController.expectOne('http://localhost:8080/mini-project/api/master_harga', 'post to api');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(postData);
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    let payload = {payload: postData};
    req.flush(payload);
    httpTestingController.verify();
  });


  it('create should make a PUT HTTP request => edit data master harga', () => {
    let postData: IDataHargaModel = {
      merk: 'Samsung',
      type: 'SM-887',
      storage: '32 GB',
      id_harga: 98,
      harga_estimasi: 8000000,
      harga_grade_a: 7000000,
      harga_grade_b: 6000000,
      harga_grade_c: 5000000
    }
    service.editData(postData).subscribe(res => {
      expect(res.payload).toEqual(postData);
    });
    const req = httpTestingController.expectOne('http://localhost:8080/mini-project/api/master_harga/' + postData.id_harga, 'put to api');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toBe(postData);
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    let payload = {payload: postData};
    req.flush(payload);
    httpTestingController.verify();
  });
});
