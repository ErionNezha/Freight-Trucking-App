import { StepperOrientation } from '@angular/cdk/stepper';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  AbstractControl,
  Validators,
} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HeaderTitleService } from 'src/app/shared/services/header-title/header-title.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-add-edit-business-location-details',
  templateUrl: './add-edit-business-location-details.component.html',
  styleUrls: ['./add-edit-business-location-details.component.scss']
})
export class AddEditBusinessLocationDetailsComponent implements OnInit {

  isLinear = true;
  indicativeFreightCostFormGroup!:FormGroup;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  firstformValues: any;
  secondformValues:any;
  indicativeFreightCostFormGroupValues:any;
 

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
    private _formBuilder: FormBuilder,
    private _headerTitle: HeaderTitleService,
    private _httpClient: HttpClient,
    private fb:FormBuilder
  ) {
     this.firstFormGroup = this._formBuilder.group({
      unit: ['', Validators.required],
      custom: ['', Validators.required],
      noOfWheels: ['', Validators.required],
      truckBodyType: ['', Validators.required],
      defaultFrightPaymentTerms: ['', Validators.required],
      inputCtrl:['', Validators.required],
     });

     this.indicativeFreightCostFormGroup=this._formBuilder.group({
      MT:['', Validators.required],
      indicativeFreightCost: this.fb.array([]) ,
     })

     this.secondFormGroup = this._formBuilder.group({
      // unit:['', Validators.required],
     });

  }


  submit() {
    this.submitBtnStatus = true;
    console.log(this.firstFormGroup.value);
    console.log(this.secondFormGroup.value);
    console.log(this.indicativeFreightCostFormGroup.value);
    this.firstformValues = this.firstFormGroup.value;
    this.secondformValues = this.secondFormGroup.value;
    this.indicativeFreightCostFormGroupValues = this.indicativeFreightCostFormGroup.value;
    
  }

  ngOnInit() {
    this._headerTitle.setTitle('Table');
    this._headerTitle.setTitle('Stepper');
    this.getScreenSize();
    this.addIndicativeFreightCost();
  }



// table code 

filterValue = '';
applyFilter(event: Event) {
  this.filterValue = (event.target as HTMLInputElement).value;
  this.filterValue = this.filterValue.trim(); // Remove whitespace
  this.filterValue = this.filterValue.toLowerCase(); // Datasource defaults to lowercase matches
  this.dataSource.filter = this.filterValue;
}


displayedColumns: string[] = ['user_name','face_id', 'reg_mobile_no','user_category', 'access_to_dispatch_documents', 'provide_support_to_driver_transporter', 'provide_digital_proof_of_delivery'];
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

unit = [
  { name: 'per Unit'}
];

MT = [
  { name: 'MT'},
  { name: 'NO'},
];

Type = [
  { name: 'custom'},
];


noOfWheels= [
  { name: '2 Wheeler'},
  { name: '4 Wheeler'},
  { name: '6 Wheeler'},
  { name: '8 Wheeler'},
  { name: '10 Wheeler'},
  { name: '12 Wheeler'},
  { name: '14 Wheeler'},
  { name: '16 Wheeler'},
  { name: '18 Wheeler'},
  { name: '20 Wheeler'},
];


truckBodyType= [
  { name: 'Closed Body'},
  { name: 'With Body'},
  { name: 'With Out Body'},
  { name: 'With Out Closed Body'},
];


IndicativeFreightCost(): FormArray {
  return this.indicativeFreightCostFormGroup.get("indicativeFreightCost") as FormArray
}

newIndicativeFreightCost(): FormGroup {
  return this.fb.group({
    cost: '',
    MT: ''
  })
}

addIndicativeFreightCost() {
  this.IndicativeFreightCost().push(this.newIndicativeFreightCost());
}

removeIndicativeFreightCost(Index:number) {
  this.IndicativeFreightCost().removeAt(Index);
}

}





export interface PeriodicElement {
  user_name: any;
  face_id: any;
  reg_mobile_no: any;
  user_category: any;
  access_to_dispatch_documents:any;
  provide_support_to_driver_transporter:any;
  provide_digital_proof_of_delivery:any;
}


const ELEMENT_DATA: PeriodicElement[] = [
  {user_name: "Vinoth Kumar",face_id: 'Hydrogen', reg_mobile_no: "+91 8587216578",user_category: 'Employee/Unit 1/Manager',access_to_dispatch_documents:'',provide_support_to_driver_transporter:'',provide_digital_proof_of_delivery:''},
  {user_name: "Syad Ifthar2",face_id: 'Hydrogen', reg_mobile_no: "+91 9545519584",user_category: '',access_to_dispatch_documents:'',provide_support_to_driver_transporter:'',provide_digital_proof_of_delivery:''},
  {user_name: "Arun Kumar",face_id: 'Hydrogen', reg_mobile_no: "+91 9387452198",user_category: '',access_to_dispatch_documents:'',provide_support_to_driver_transporter:'',provide_digital_proof_of_delivery:''},
  {user_name: "Kumar Singh",face_id: 'Hydrogen', reg_mobile_no: "+91 9387452198",user_category: '',access_to_dispatch_documents:'',provide_support_to_driver_transporter:'',provide_digital_proof_of_delivery:''},
  {user_name: "Arun Kumar",face_id: 'Hydrogen', reg_mobile_no: "+91 7198542102",user_category: 'App administrator',access_to_dispatch_documents:'',provide_support_to_driver_transporter:'',provide_digital_proof_of_delivery:''},
  {user_name: "Kumar Singh",face_id: 'Hydrogen', reg_mobile_no: "+91 7198542102",user_category: 'App administrator',access_to_dispatch_documents:'',provide_support_to_driver_transporter:'',provide_digital_proof_of_delivery:''},
  {user_name: "Arun Kumar",face_id: 'Hydrogen', reg_mobile_no: "+91 9387452198",user_category: 'App administrator',access_to_dispatch_documents:'',provide_support_to_driver_transporter:'',provide_digital_proof_of_delivery:''},
  {user_name: "Manigandan J",face_id: 'Hydrogen', reg_mobile_no: "+91 7198542102",user_category: 'App administrator',access_to_dispatch_documents:'',provide_support_to_driver_transporter:'',provide_digital_proof_of_delivery:''},


]