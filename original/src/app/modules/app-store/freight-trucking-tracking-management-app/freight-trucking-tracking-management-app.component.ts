import { BreakpointObserver, MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable, Subscription } from 'rxjs';
import { AuditTrailDialogComponent } from 'src/app/shared/audit-trail-dialog/audit-trail-dialog.component';
import { HeaderTitleService } from 'src/app/shared/services/header-title/header-title.service';
import { AudiTrailTableComponent } from './audi-trail-table/audi-trail-table.component';
declare var GoogleTranslate: Function;

@Component({
  selector: 'app-freight-trucking-tracking-management-app',
  templateUrl: './freight-trucking-tracking-management-app.component.html',
  styleUrls: ['./freight-trucking-tracking-management-app.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class FreightTruckingTrackingManagementAppComponent implements OnInit {
  
  headerTitle$: Subscription;
  breakPointObserver$: Subscription;
  getsterAccessControlForm: FormGroup = new FormGroup({});
  tabName: string = 'Table';
  showTranslate: boolean = true;
  formvalue: any;

  @ViewChild('sidenav')
  sidenav!: MatSidenav;
  audit_trail$: Observable<any>;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  

  constructor(
    private observer: BreakpointObserver,
    private cdRef: ChangeDetectorRef,
    private dialog: MatDialog,
    private _headerTitle: HeaderTitleService,
    private _formBuilder: FormBuilder,
    media: MediaMatcher,
    private _cdRef: ChangeDetectorRef,

  ) {
    this.firstFormGroup = this._formBuilder.group({
      languageControl: [''],
    });
    this.mobileQuery = media.matchMedia('(max-width: 800px)');
    this._mobileQueryListener = () => _cdRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }
  firstFormGroup!: FormGroup;

  ngOnInit(): void {
    this.sidenav;
    this.headerTitle$ = this._headerTitle.title.subscribe((title) => {
      this.menuName = title;
      this.cdRef.detectChanges();
    });
  }

  get writer() {
    return this.firstFormGroup.get('languageControl');
  }

  onlanguagechange() {
    console.log(this.writer.value);
    this.formvalue = this.writer.value;
    localStorage.setItem('googleTranslate', this.formvalue);
    GoogleTranslate();
  }

  ngAfterViewInit() {
    this.breakPointObserver$ = this.observer
      .observe(['(max-width: 800px)'])
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
    this.cdRef.detectChanges();
  }

  showbtn() {
    this.showTranslate = !this.showTranslate;
  }
  
  sideOnclickClose() {
    if (this.sidenav.mode == 'side') {
      this.sidenav.open();
    } else {
      this.sidenav.close();
    }


  }
  
  stopClose($event: any) {
    $event.stopPropagation();
    //Another instructions
  }
  menuName: any;
  menu = [
    { label: 'Plan freight load', link: '/freight-trucking-tracking-management-app/plan-freight-load' },
    { label:'Allocate FreightTo Transporter', link: '/freight-trucking-tracking-management-app/allocate-freight-to-transporter' },
    { label:'Enter Transport Vehicle Details', link: '/freight-trucking-tracking-management-app/enter-transport-vehicle-details' },
    { label: 'Track Freight', link: '/freight-trucking-tracking-management-app/track-freight' },
    { label: 'Add / Edit Transporter - Business Service Areas and User Permissions', link: '/freight-trucking-tracking-management-app/manage-trucker-transporter' },
    { label: 'Business wise Default Freight Details and User Permissions', link: '/freight-trucking-tracking-management-app/business-locations-details' },
    { label: 'Freight Load History', link:'/empty' },

  ];



  // 
  // 
  // Freight Load History

   getName(data: any) {
    this.menuName = data;
   }


  // openAuditTrail() {
  //   let config: MatDialogConfig = {
  //     panelClass: 'dialog-responsive',
  //     disableClose: true,
  //     minWidth: '400px',
  //     minHeight: 'calc(100vh - 500px)',
  //   };
  //   const auditTrailDialog = this.dialog.open(AudiTrailTableComponent, config);
  // }


  openAuditTrail() {
      let config: MatDialogConfig = {
        disableClose: true,
        minWidth: '400px',
        minHeight: 'calc(100vh - 500px)',
      };
      const auditTrailDialog = this.dialog.open(
        AuditTrailDialogComponent,
        config
      );
      }
  



  ngOnDestroy(): void {
    this.breakPointObserver$.unsubscribe();
    this.headerTitle$.unsubscribe();
  }
  
  googleLanguage: lang[] = [
    {
      value: 'af',
      label: 'Afrikaans',
    },
    {
      value: 'sq',
      label: 'Albanian',
    },
    {
      value: 'ar',
      label: 'Arabic',
    },
    {
      value: 'az',
      label: 'Azerbaijani',
    },
    {
      value: 'eu',
      label: 'Basque',
    },
    {
      value: 'bn',
      label: 'Bengali',
    },
    {
      value: 'be',
      label: 'Belarusian',
    },
    {
      value: 'bg',
      label: 'Bulgarian',
    },
    {
      value: 'ca',
      label: 'Catalan',
    },
    {
      value: 'zh-CN',
      label: 'Chinese Simplified',
    },
    {
      value: 'zh-TW',
      label: 'Chinese Traditional',
    },
    {
      value: 'hr',
      label: 'Croatian',
    },
    {
      value: 'cs',
      label: 'Czech',
    },
    {
      value: 'da',
      label: 'Danish',
    },
    {
      value: 'nl',
      label: 'Dutch',
    },
    {
      value: 'en',
      label: 'English',
    },
    {
      value: 'eo',
      label: 'Esperanto',
    },
    {
      value: 'et',
      label: 'Estonian',
    },
    {
      value: 'tl',
      label: 'Filipino',
    },
    {
      value: 'fi',
      label: 'Finnish',
    },
    {
      value: 'fr',
      label: 'French',
    },
    {
      value: 'gl',
      label: 'Galician',
    },
    {
      value: 'ka',
      label: 'Georgian',
    },
    {
      value: 'de',
      label: 'German',
    },
    {
      value: 'el',
      label: 'Greek',
    },
    {
      value: 'gu',
      label: 'Gujarati',
    },
    {
      value: 'ht',
      label: 'Haitian Creole',
    },
    {
      value: 'iw',
      label: 'Hebrew',
    },
    {
      value: 'hi',
      label: 'Hindi',
    },
    {
      value: 'hu',
      label: 'Hungarian',
    },
    {
      value: 'is',
      label: 'Icelandic',
    },
    {
      value: 'id',
      label: 'Indonesian',
    },
    {
      value: 'ga',
      label: 'Irish',
    },
    {
      value: 'it',
      label: 'Italian',
    },
    {
      value: 'ja',
      label: 'Japanese',
    },
    {
      value: 'kn',
      label: 'Kannada',
    },
    {
      value: 'ko',
      label: 'Korean',
    },
    {
      value: 'la',
      label: 'Latin',
    },
    {
      value: 'lv',
      label: 'Latvian',
    },
    {
      value: 'lt',
      label: 'Lithuanian',
    },
    {
      value: 'mk',
      label: 'Macedonian',
    },
    {
      value: 'ms',
      label: 'Malay',
    },
    {
      value: 'mt',
      label: 'Maltese',
    },
    {
      value: 'no',
      label: 'Norwegian',
    },
    {
      value: 'fa',
      label: 'Persian',
    },
    {
      value: 'pl',
      label: 'Polish',
    },
    {
      value: 'pt',
      label: 'Portuguese',
    },
    {
      value: 'ro',
      label: 'Romanian',
    },
    {
      value: 'ru',
      label: 'Russian',
    },
    {
      value: 'sr',
      label: 'Serbian',
    },
    {
      value: 'sk',
      label: 'Slovak',
    },
    {
      value: 'sl',
      label: 'Slovenian',
    },
    {
      value: 'es',
      label: 'Spanish',
    },
    {
      value: 'sw',
      label: 'Swahili',
    },
    {
      value: 'sv',
      label: 'Swedish',
    },
    {
      value: 'ta',
      label: 'Tamil',
    },
    {
      value: 'te',
      label: 'Telugu',
    },
    {
      value: 'th',
      label: 'Thai',
    },
    {
      value: 'tr',
      label: 'Turkish',
    },
    {
      value: 'uk',
      label: 'Ukrainian',
    },
    {
      value: 'ur',
      label: 'Urdu',
    },
    {
      value: 'vi',
      label: 'Vietnamese',
    },
    {
      value: 'cy',
      label: 'Welsh',
    },
    {
      value: 'yi',
      label: 'Yiddish',
    },
  ];
}



interface lang {
  value: string;
  label: string;
}
