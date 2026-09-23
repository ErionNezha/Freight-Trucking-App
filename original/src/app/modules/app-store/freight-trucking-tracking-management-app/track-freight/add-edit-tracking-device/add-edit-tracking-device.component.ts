import { StepperOrientation } from '@angular/cdk/stepper';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MtxDatetimepickerType, MtxDatetimepickerMode, MtxCalendarView } from '@ng-matero/extensions/datetimepicker';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import { HeaderTitleService } from 'src/app/shared/services/header-title/header-title.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-add-edit-tracking-device',
  templateUrl: './add-edit-tracking-device.component.html',
  styleUrls: ['./add-edit-tracking-device.component.scss']
})
export class AddEditTrackingDeviceComponent implements OnInit {
  phoneInput!: NgxMatIntlTelInputComponent;
  isLinear:true;
  phone: any = true;

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!:FormGroup;
  forthFormGroup!:FormGroup;
  firstformValues: any;
  secondformValues:any;
  thirdformValues:any;
  forthFormValues:any;
  

  type: MtxDatetimepickerType = 'datetime';
  mode: MtxDatetimepickerMode = 'portrait';
  startView: MtxCalendarView = 'month';
  multiYearSelector = false;
  touchUi = false;
  twelvehour = false;
  timeInterval = 0;

  submitBtnStatus: boolean = false;

  scrHeight: any;
  scrWidth: any;
  orientation: StepperOrientation = 'vertical';
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: any) {
    this.scrHeight = window.innerHeight;
    this.scrWidth = window.innerWidth;
    if (this.scrWidth <= '768') {
      this.orientation = 'vertical';
    } else {
      this.orientation = 'horizontal';
    }
  }

  constructor(
    private _httpClient: HttpClient,
    private _formBuilder: FormBuilder,
    private _headerTitle: HeaderTitleService,

  ) {
    this.firstFormGroup = this._formBuilder.group({
    });

    this.secondFormGroup = this._formBuilder.group({
    });

    this.thirdFormGroup = this._formBuilder.group({
      trackingSeconds: ['', Validators.required],
    });
    this.forthFormGroup = this._formBuilder.group({
      trackingDeviceId: ['', Validators.required],
      setGPSTrackingTimeInterval: ['', Validators.required],
      driverName: ['', Validators.required],
      // phone:['', Validators.required],
      phone: new FormControl(undefined, [Validators.required]),
    });

  }

  // table search filter
  filterValue = '';
  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.filterValue = this.filterValue.trim(); // Remove whitespace
    this.filterValue = this.filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = this.filterValue;
  }


  
  displayedColumns: string[] = ['user_name','face_id', 'reg_mobile_no', 'user_category'];

  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild('paginatorElement', { read: ElementRef })
  paginatorHtmlElement!: ElementRef;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.translateMatPaginator(this.paginator);
  }

  translateMatPaginator(paginator: MatPaginator) {
    paginator._intl.firstPageLabel = 'First';
    paginator._intl.itemsPerPageLabel = 'Records Per Page';
    paginator._intl.lastPageLabel = 'Last';
    paginator._intl.nextPageLabel = 'Next';
    paginator._intl.previousPageLabel = 'Previous';
  }

  exportReport(fileName: any): void {
    /* pass here the table id */
    let element = document.getElementById('excel_table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
  
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
    /* save to file */
    XLSX.writeFile(wb, fileName);
  }

  
  onPrint() {
    window.print();
  }
  
  @ViewChild('pdfTable', { static: false }) pdfTable!: ElementRef;
  public downloadAsPDF() {
    const htmlToPrint =
      '' +
      '<style type="text/css">' +
      '.pageFooter {' +
      '    display: table-footer-group;' +
      '    counter-increment: page;' +
      '}' +
      '.pageFooter:after {' +
      '   content: "Page " counter(page)' +
      '}' +
      '</style>';
    var printContents = document.getElementById('pdfTable')!.innerHTML;
    let popupWin: any = window.open(
      'Angular Large Table to pdf',
      '_blank',
      'width=768,height=auto'
    );
  
    popupWin.document.write(
      '<html><head>' +
        '<link rel="stylesheet" href="' +
        'https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"/>' +
        '<style type="text/css">' +
        '.pageFooter {' +
        '    display: table-footer-group;' +
        '    counter-increment: page;' +
        '}' +
        '.pageFooter:after {' +
        '   content: "Page Number" counter(page)' +
        '}' +
        '</style>' +
        `</head>
          <body onload="window.print();window.close()"> 
            <div style="width:100%;  display: flex;flex-direction: row; margin-bottom:5px">
              <img style="width:40px;height:40px" src="assets/icons/logo.png" alt="app-logo" />
              <div style=" display: flex;flex-direction: column; width:100%">
                <span style="text-align: center;font-size:16px;color:blue;text-size:16px;font-weight:600">GETster.TECH PVT.LTD</span>
                <span style="text-align: center;text-size:14px;color:black;font-weight:600">Existing Getster Profile</span> 
              </div>
            </div>` +
        printContents +
        '</body>' +
        `<footer style="position: fixed; bottom: 0; width: 100%;"><div style=" display: flex;flex-direction: column; width:100%">
      <span style="text-align: end;font-size:12px;text-size:12px;font-weight:500">Jr Plaza Fourth Floor, Tank Street, </span>
      <span style="text-align: end;font-size:12px;text-size:12px;font-weight:500">Hosur, Tamil Nadu 635109</span>
      </div> </footer>` +
        '</html>'
    );
    popupWin.document.close();
  } 
  

  canLeave(): boolean {
    if (this.submitBtnStatus) {
      return true;
    }    
    try {
      if (this.firstFormGroup.dirty || this.secondFormGroup.dirty) {
        return window.confirm(
          'You have some unsaved changes. Are you sure you want to navigate?'
        );
      }
      return true;
    } finally {
      this._headerTitle.setTitle('Stepper');
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadHandler($event: any) {
    if (!this.submitBtnStatus) {
      $event.returnValue = `Are you sure you want to leave?`;
    }
  }


  submit() {
    this.submitBtnStatus = true;
    console.log(this.firstFormGroup.value);
    console.log(this.secondFormGroup.value);
    console.log(this.thirdFormGroup.value);
    console.log(this.forthFormGroup.value);

    this.firstformValues = this.firstFormGroup.value;
    this.secondformValues = this.secondFormGroup.value;
    this.thirdformValues = this.thirdFormGroup.value;
    this.forthFormValues = this.forthFormGroup.value;
  }



  ngOnInit() {
    this._headerTitle.setTitle('Stepper');
    this.getScreenSize();
    this._headerTitle.setTitle('Telephone Input');
  }

  trackingSeconds = [
    { name: 'Every 10 Seconds'},
    { name: 'Every 20 Seconds'},
    { name: 'Every 30 Seconds'},
    { name: 'Every 60 Seconds'},
  ];


  setGPSTrackingTimeInterval = [
    { name: 'Every 10 Seconds'},
    { name: 'Every 20 Seconds'},
    { name: 'Every 30 Seconds'},
    { name: 'Every 60 Seconds'},
  ];

}







export interface PeriodicElement {
  user_name:string;
  face_id:string;
  reg_mobile_no: string;
  user_category: string;
}



const ELEMENT_DATA: PeriodicElement[] = [
                     {user_name: 'suresh',face_id: 'suresh', reg_mobile_no: 'immedi',user_category: 'Hhhhhhhhhh'},
 
];





