export interface MasterHargaModel {
  next: boolean,
  previous: boolean,
  message: string,
  current_page: number,
  total_pages: number,
  page_size: number,
  total_data: number
  data: IDataHargaModel[]
}

export interface IDataHargaModel {
  merk?: string,
  type?: string,
  storage?: string,
  id_harga?: number,
  harga_estimasi?: number,
  harga_grade_a?: number,
  harga_grade_b?: number,
  harga_grade_c?: number
}

export interface IResponsePostHargaModel {
  err_msg?: string,
  payload?: IDataHargaModel
}
