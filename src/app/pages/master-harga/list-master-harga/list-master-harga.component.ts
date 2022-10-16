import {Component, OnInit, ViewChild} from '@angular/core';
import {MasterHargaService} from "../master-harga.service";
import {ConfirmationService, LazyLoadEvent, MessageService} from "primeng/api";
import {IDataHargaModel, MasterHargaModel} from "../master-harga-model";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-list-master-harga',
  templateUrl: './list-master-harga.component.html',
  styleUrls: ['./list-master-harga.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class ListMasterHargaComponent implements OnInit {

  @ViewChild("dt") dt!: any;
  productDialog!: boolean;
  items!: IDataHargaModel[];
  totalRecords!: number | 0;
  isLoading: boolean = false;
  private unsubcribe$ = new Subject();
  harga!: IDataHargaModel;

  first: number = 0;
  rows: number | undefined = 10;
  sortField: string | undefined = "merk";
  sortOrder: number | undefined = 1;
  globalFilter: any;

  submitted!: boolean;

  constructor(private masterHargaService: MasterHargaService, private messageService: MessageService, private confirmationService: ConfirmationService) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.masterHargaService.getData({}).pipe(takeUntil(this.unsubcribe$)).subscribe((res: MasterHargaModel) => {
      this.items = res.data;
      this.totalRecords = res.total_data;
      this.isLoading = false;
    });

  }

  getData(event: LazyLoadEvent) {
    this.isLoading = true;
    setTimeout(() => {
      this.masterHargaService.getData(event).pipe(takeUntil(this.unsubcribe$)).subscribe((res: MasterHargaModel) => {
        this.items = res.data;
        this.totalRecords = res.total_data;
        this.isLoading = false;
      }, ((err: Error) => {
        console.log(err);
        this.isLoading = false;
      }))
    }, 1000);

  }

  searchData(event: any) {
    const res = (event.target as HTMLInputElement)?.value
    this.dt.filterGlobal(res, 'contains');
  }

  openNew() {
    this.harga = {};
    this.submitted = false;
    this.productDialog = true;
  }

  editData(harga: IDataHargaModel) {
    this.harga = {...harga};
    this.productDialog = true;
  }

  deleteData(harga: IDataHargaModel) {
    let id_harga: number | string = harga.id_harga ? harga.id_harga : '';
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + harga.merk + ',' + harga.type + ',' + harga.storage + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger p-button-sm',
      rejectButtonStyleClass: 'p-button-warning p-button-sm',
      acceptLabel: 'Delete',
      rejectLabel: 'Cancel',
      accept: () => {
        this.masterHargaService.deleteData(id_harga).subscribe(response => {
          //console.log(response);
        });
        this.items = this.items.filter(val => val.id_harga !== harga.id_harga);
        this.totalRecords = this.totalRecords - 1;
        this.harga = {};
        this.messageService.add({
          key: 'notifDataHarga',
          severity: 'warn',
          summary: 'Successful',
          detail: 'Data Deleted',
          life: 3000
        });
      }
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveData() {
    this.submitted = true;
    this.isLoading = true;
    if (this.harga.id_harga) {
      let id_harga: number = this.harga.id_harga ? this.harga.id_harga : 0;
      this.items[this.findIndexById(id_harga)] = this.harga;
      this.masterHargaService.editData(this.harga).subscribe(response => {
        if (response.err_msg === 'ok') {
          /*if (response.payload) {
            this.items[this.findIndexById(id_harga)] = response.payload;
          }*/
          //this.items[this.findIndexById(id_harga)] = this.harga;
          //this.getData({});
          this.messageService.add({
            key: 'notifDataHarga',
            severity: 'warn',
            summary: 'Successful',
            detail: 'Harga Updated',
            life: 3000
          });

        }
      });

    } else {
      this.items.push(this.harga);
      this.totalRecords = this.totalRecords + 1;
      this.masterHargaService.postData(this.harga).subscribe(response => {
        if (response.err_msg === 'ok') {
          //this.totalRecords = this.totalRecords + 1;
          this.messageService.add({
            key: 'notifDataHarga',
            severity: 'warn',
            summary: 'Successful',
            detail: 'Harga Created',
            life: 3000
          });

          //this.getData({});
          //this.items.push(this.harga);
          /* if (response.payload) {
             this.items.push(response.payload);
           }*/
        }
      });

    }
    this.isLoading = false;
    this.productDialog = false;
    this.harga = {};
  }

  uploadData(event: any) {
    this.masterHargaService.uploadFile(event[0]).subscribe(res => {
      console.log(res);
    });
    //console.log(event.currentFiles);
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.totalRecords; i++) {
      if (this.items[i].id_harga === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  /*refreshData() {
    this.isLoading = true
    let branchId = null
    if (this.branch != null) {
      branchId = this.branch.id
    }
    this.userService
      .userFilter(this.globalFilter, branchId, this.sortField, this.sortMode, this.page, this.maxRows)
      .subscribe(
        res => {
          this.ListUser = res.elements.map<UserApi>(item => new UserApi(item))
          this.totalRecords = res.totalElements
          this.isLoading = false
        },
        error => {
          this.isLoading = false
        }
      )
  }*/

  /*loadDataLazy(event: LazyLoadEvent): LazyLoadEvent {
    this.rows = event.rows
    this.globalFilter = event.globalFilter
    this.sortField = event.sortField
    this.sortOrder = event.sortOrder;
    this.refreshData()
    return event;
  }

  private refreshData() {

  }*/


}
