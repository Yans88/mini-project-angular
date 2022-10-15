import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {TransaksiModel} from "./transaksi-model";
import {IResponsePostHargaModel} from "../master-harga/master-harga-model";

@Injectable({
  providedIn: 'root'
})
export class TransaksiService {

  urlApi: string = environment.endpoint.miniProjectAPI + '/transaksi';

  constructor(private http: HttpClient) {
  }


  getData(status: number, first?: number, rows?: number, sortField?: string, sortOrderTabel: number=1, globalFilter?: string): Observable<TransaksiModel> {
    rows = rows ? rows : 10;
    first = first ? first / rows : 0;
    sortField = sortField ? sortField : 'idTransaksi';
    let sortOrder = sortOrderTabel >= 0 ? 'asc' : 'desc';
    globalFilter = globalFilter ? globalFilter : '';
    sortField = globalFilter && sortField === 'idTransaksi' ? 'id_transaksi' : sortField;
    return this.http.get<TransaksiModel>(`${this.urlApi}?status=${status}&page=${first}&size=${rows}&sort_column=${sortField}&sort_order=${sortOrder}&email_phone=${globalFilter}`);
  }

  updateStatus(id?:number, status?:number):Observable<TransaksiModel>{
    const body = {
      id_transaksi:id,
      status:status
    }
    const headerOption = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=UTF-8',
      }),
    };
    return this.http.post<TransaksiModel>(
      `${this.urlApi}`+'/update_status',
      body,
      headerOption
    );
  }
}
