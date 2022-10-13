import {TestBed} from '@angular/core/testing';

import {MasterHargaService} from './master-harga.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('MasterHargaService', () => {
  let service: MasterHargaService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(MasterHargaService);
  });

  it('should be created', () => {

    expect(service).toBeTruthy();
  });
});
