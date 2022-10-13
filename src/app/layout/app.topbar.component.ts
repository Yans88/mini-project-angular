import {Component, ElementRef, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {MySessionService} from '../auth/my-session.service';
import {LayoutService} from './service/app.layout.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent {
  items!: MenuItem[];
  items2!: MenuItem[];

  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;

  constructor(
    public layoutService: LayoutService,
    private router: Router,
    public sessionService: MySessionService
  ) {
    this.items2 = [
      {
        label: 'Logout',
        icon: 'pi pi-fw pi-power-off',
        command: () => this.logOut(),
      },
    ];
  }

  logOut(): void {
    this.sessionService.destroySession();
    this.router.navigateByUrl('/auth/login');
  }
}
