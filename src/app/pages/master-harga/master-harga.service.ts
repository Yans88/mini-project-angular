import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {IDataHargaModel, IResponsePostHargaModel, MasterHargaModel} from "./master-harga-model";

@Injectable({
  providedIn: 'root'
})
export class MasterHargaService {

  urlApi: string = environment.endpoint.miniProjectAPI + '/master_harga';

  constructor(private http: HttpClient) {
  }

  getData(param: any): Observable<MasterHargaModel> {
    let {first, rows, sortField, sortOrder, globalFilter} = param;
    rows = rows ? rows : 10;
    first = first ? first / rows : 0;
    sortField = sortField ? sortField : 'merk';
    sortOrder = sortOrder < 0 ? 'desc' : 'asc';
    globalFilter = globalFilter ? globalFilter : '';
    return this.http.get<MasterHargaModel>(`${this.urlApi}?page=${first}&size=${rows}&sort_column=${sortField}&sort_order=${sortOrder}&keyword=${globalFilter}`);
  }

  postData(body: IDataHargaModel): Observable<IResponsePostHargaModel> {
    const headerOption = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=UTF-8',
      }),
    };
    return this.http.post<IResponsePostHargaModel>(
      `${this.urlApi}`,
      body,
      headerOption
    );
  }

  editData(body: IDataHargaModel): Observable<IResponsePostHargaModel> {
    const headerOption = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=UTF-8',
      }),
    };
    return this.http.put<IResponsePostHargaModel>(
      `${this.urlApi}/${body.id_harga}`,
      body,
      headerOption
    );
  }

  deleteData(id: number | string): Observable<any> {
    return this.http.delete(`${this.urlApi}/${id}`)
  }

  uploadFile(body: File) {
    let formData = new FormData();
    formData.append('file', body);
    return this.http.post(
      `${this.urlApi}/import`,
      formData
    );
  }

}
