import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NavigationService } from 'src/app/shared/services/navigation/navigation.service';
import { Platform } from '@angular/cdk/platform';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter, map } from 'rxjs/operators';
import { LoaderService } from 'src/app/shared/services/progress-bar-loader/loader.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { InstallPwaService } from 'src/app/shared/services/Install-PWA/install-pwa.service';
import { StyleManager } from 'src/app/shared/services/style-manager/style-manager.service';
import { ConnectivityService } from 'src/app/shared/services/connectivity/connectivity.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  showInstallPromotion$ = this.appPwaService.showInstallPromotion$;

  selected: any = 'english';
  // form: FormGroup;
  @ViewChild('message') message!: ElementRef;

  appTitle: string = 'Freight - Transport - Tracking Management App';

  scrHeight: any;
  scrWidth: any;
  isDark = this.styleManager.isDark;
  isOnline: boolean;
  NetworkStatus$: Subscription;

  constructor(
    public navigation: NavigationService,
    public dialog: MatDialog,
    private router: Router,
    public loaderService: LoaderService,
    private readonly matIconRegistry: MatIconRegistry,
    private readonly domSanitizer: DomSanitizer,
    private readonly appPwaService: InstallPwaService,
    private styleManager: StyleManager,
    private connection: ConnectivityService,
    private _cdRef:ChangeDetectorRef
  ) {
    this.getScreenSize();
  }
  titleLength: any;
  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.scrHeight = window.innerHeight;
    this.scrWidth = window.innerWidth;
  }

  loginPage: any;
  ngOnInit(): void {
    // this.loginPage = 0;
    // this.matIconRegistry.addSvgIconResolver((name, namespace) => {
    //   return namespace === ''
    //     ? this.domSanitizer.bypassSecurityTrustResourceUrl(
    //         `/assets/img/svg/${name}.svg`
    //       )
    //     : null;
    // });

    this.appPwaService.interceptDefaultInstall();
    // this.connection.isConnected$.subscribe(res=>{
    //   console.log(res);

    // })
    this.NetworkStatus$ = this.connection.isConnected$.subscribe((res) => {
      this.isOnline = res;
    });
  }

  getclass() {
    if (this.isOnline === true) {
      return 'header-online';
    } else if (this.isOnline === false) {
      return 'header-offline';
    }
    this._cdRef.detectChanges();
    return 'header-onLine';
  }

  onShare() {
    if (navigator.share) {
      navigator
        .share({
          title: 'Share Via',
          text: 'This is the text which I will be sharing!',
          url: 'http://getbiz.app',
        })
        .then(() => {
          console.log('Called!');
          (<HTMLElement>this.message.nativeElement).innerHTML = 'Called!';
        })
        .catch((error) => {
          console.log('Error sharing:', error);
          (<HTMLElement>this.message.nativeElement).innerHTML =
            'Error: ' + error;
        });
    } else {
      console.error('navigator.share API not supported by the browser!');
      (<HTMLElement>this.message.nativeElement).innerHTML =
        'navigator.share API not supported by the browser!';
    }
  }

  async getPWADisplayMode() {}

  logOut() {
    localStorage.setItem('page', '1');
    this.router.navigate(['/app-store']).then(() => {
      window.location.reload();
    });
  }
  installPromotion() {
    this.appPwaService.installPromotion();
  }

  toggleDarkTheme() {
    this.styleManager.toggleDarkTheme();
    this.isDark = !this.isDark;
    this.applyDarkDialog();
  }

  applyDarkDialog(): void {
    if (this.isDark) {
      localStorage.setItem('dark', 'true');
    } else {
      localStorage.setItem('dark', 'false');
    }
  }

  openAuditTrail() {
    let config: MatDialogConfig = {
      panelClass: 'dialog-responsive',
    };

    // const auditTrailDialog = this.dialog.open(AudiTrailTableComponent, config);
  }

  ngOndestroy() {
    this.NetworkStatus$.unsubscribe();
  }
}
