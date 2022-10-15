export interface TransaksiModel {
  next: boolean,
  previous: boolean,
  message: string,
  err_msg?: string,
  current_page: number,
  total_pages: number,
  page_size: number,
  total_data: number
  data: IDataTransaksiModel[]
}

export interface IDataTransaksiModel {
  merk?: string,
  type?: string,
  storage?: string,
  phone?: string,
  email?: string,
  harga?: number,
  grade?: string,
  status?: number,
  id_transaksi?: number,
  id_toko?: number,
  id_harga?: number,
  body_scratch?: number,
  camera_depan?: number,
  camera_belakang?: number,
  tombol_on_off?: number,
  tombol_volume?: number,
  test_speaker?: number,
  test_touchscreen?: number,
  nama_toko?: string,
  created_at?: any
}


