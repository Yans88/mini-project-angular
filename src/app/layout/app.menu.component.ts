import {Component, OnInit} from '@angular/core';
import {LayoutService} from './service/app.layout.service';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
  model: any[] = [];

  constructor(public layoutService: LayoutService) {
  }

  ngOnInit() {
    this.model = [
      {
        label: 'Pages',
        icon: 'pi pi-fw pi-briefcase',
        routerLink: ['/page'],
        items: [
          {
            label: 'Dashboard',
            icon: 'pi pi-fw pi-home',
            routerLink: [''],
          },
          /* {
             label: 'About Us',
             icon: 'pi pi-fw pi-globe',
             routerLink: ['/pages/about_us'],
           },
           {
             label: 'Contact Us',
             icon: 'pi pi-whatsapp',
             routerLink: ['/pages/contact_us'],
           },
           {
             label: 'CRUD Data Provinsi',
             icon: 'pi pi-book',
             routerLink: ['/pages/crud'],
           },*/
          {
            label: 'Master Harga',
            icon: 'pi pi-align-justify',
            routerLink: ['/pages/master_harga'],
          },
          {
            label: 'Data Transaksi',
            icon: 'pi pi-align-justify',
            routerLink: ['/pages/master_harga'],
          },
        ],
      },
    ];
  }
}
