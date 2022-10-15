import {Component, OnInit, ViewChild} from '@angular/core';
import {ConfirmationService, LazyLoadEvent, MessageService} from "primeng/api";
import {TransaksiService} from "../transaksi.service";
import {Subject, takeUntil} from "rxjs";
import {IDataTransaksiModel, TransaksiModel} from "../transaksi-model";
import {Router} from "@angular/router";
import {WebSocketAPI} from "../../../layout/api/WebSocketAPI";

@Component({
  selector: 'app-list-transaksi',
  templateUrl: './list-transaksi.component.html',
  styleUrls: ['./list-transaksi.component.scss'],
  providers: [WebSocketAPI, ConfirmationService, MessageService]
})
export class ListTransaksiComponent implements OnInit {

  @ViewChild("dt") dt!: any;
  title: string = "";
  first?: number = 0;
  rows?: number = 10;
  sortField?: string = "";
  sortOrder: number = 1;
  globalFilter: any;
  status: number = 1;

  items!: IDataTransaksiModel[];
  totalRecords!: number | 0;
  isLoading: boolean = false;
  isBtnLoading: boolean = false;
  href!: string;
  selectedData?: IDataTransaksiModel;
  private unsubcribe$ = new Subject();
  titleDialog!: string;

  transaksiDialog: boolean = false;

  constructor(private transaksiService: TransaksiService, private router: Router, public webSocketAPI: WebSocketAPI, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.href = this.router.url.split('/')[2];
    if (this.href === 'approve') {
      this.title = 'Onproses';
    } else if (this.href == 'reject') {
      this.title = 'Ditolak';
    } else if (this.href == 'cancel') {
      this.title = 'Cancel';
    } else {
      this.webSocketAPI.clearCounter();
      this.title = 'New Transaksi';
    }
    this.getData();
  }

  getData() {
    this.isLoading = true;
    setTimeout(() => {
      this.transaksiService.getData(this.status, this.first, this.rows, this.sortField, this.sortOrder, this.globalFilter).pipe(takeUntil(this.unsubcribe$)).subscribe((res: TransaksiModel) => {
          this.items = res.data;
          this.totalRecords = res.total_data;
          this.isLoading = false;
        }, ((err: Error) => {
          this.items = [];
          this.totalRecords = 0;
          console.log(err);
          this.isLoading = false;
        })
      );
    }, 1000);
  }

  loadDataLazy(event: LazyLoadEvent): LazyLoadEvent {
    this.first = event.first;
    this.rows = event.rows;
    this.globalFilter = event.globalFilter;
    this.sortField = event.sortField;
    this.sortOrder = <number>event.sortOrder;
    if (this.href === 'approve') {
      this.status = 2;
    } else if (this.href == 'reject') {
      this.status = 3;
    } else if (this.href == 'cancel') {
      this.status = 4;
    } else {
      this.status = 1;
    }
    this.getData()
    return event;
  }

  searchData(event: any) {
    const res = (event.target as HTMLInputElement)?.value
    this.dt.filterGlobal(res);
  }

  onRowSelect(event: any) {
    if (event) {
      this.titleDialog = "Detail Transaksi #" + event.data.id_transaksi;
      this.selectedData = {...event.data};
      this.transaksiDialog = true;
      this.isBtnLoading = false;
    }
  }

  hideDialog() {
    this.titleDialog = '';
    this.transaksiDialog = false;
    this.isBtnLoading = false;
  }

  approveTransaksi(id?: number, status?: number) {
    this.isBtnLoading = true;
    this.transaksiService.updateStatus(id, status).subscribe(response => {
      if (response.err_msg === 'ok') {
        const pesan = status === 2 ? 'diproses' : 'ditolak';
        this.messageService.add({
          key: 'updateStatusTransaksi',
          severity: status === 2 ? 'success' : 'warn',
          summary: 'Successful',
          detail: 'Transaksi #' + id + ' ' + pesan,
          life: 3000
        });
        this.getData();
        this.titleDialog = '';
        this.transaksiDialog = false;
        this.isBtnLoading = false;
      } else {
        this.messageService.add({
          key: 'updateStatusTransaksi',
          severity: 'error',
          summary: 'Error',
          detail: response.message,
          life: 3000
        });
        this.isBtnLoading = false;
      }
    });
  }

}
