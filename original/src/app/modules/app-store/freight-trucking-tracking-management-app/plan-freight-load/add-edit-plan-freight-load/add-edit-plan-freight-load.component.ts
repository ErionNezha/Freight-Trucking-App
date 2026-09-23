import { SelectionModel } from '@angular/cdk/collections';
import { StepperOrientation } from '@angular/cdk/stepper';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {
  MtxCalendarView,
  MtxDatetimepickerMode,
  MtxDatetimepickerType,
} from '@ng-matero/extensions/datetimepicker';
import { CanComponentLeave } from 'src/app/shared/guards/unsaved-changes/unsaved-changes.guard';
import { HeaderTitleService } from 'src/app/shared/services/header-title/header-title.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-add-edit-plan-freight-load',
  templateUrl: './add-edit-plan-freight-load.component.html',
  styleUrls: ['./add-edit-plan-freight-load.component.scss']
})
export class AddEditPlanFreightLoadComponent implements OnInit {

  isLinear = true;

  businessGroupsWhoCanAccessDispatchDocumentsForm:FormGroup;

  firstFormGroup!: FormGroup;
  pickUpDeliveryForm!:FormGroup;
  pickUpAndDeliveryQuantityForm!:FormGroup;
  pickUpAndDeliveryQuantityForm1!:FormGroup;
  deliveryForm!:FormGroup;
  

  secondFormGroup!: FormGroup;
  thirdFormGroup!:FormGroup;
  forthFormGroup!:FormGroup;
  fifthFormGroup!:FormGroup;
  sixthFormGroup!:FormGroup;

  
  businessGroupsWhoCanAccessDispatchDocumentsFormValues:any;

  firstformValues: any;
  pickUpDeliveryFormValues:any;
  pickUpAndDeliveryQuantityFormValues:any;
  pickUpAndDeliveryQuantityFormValues1:any;
  deliveryFormValues:any;


  secondformValues:any;
  thirdFormValues:any;
  forthFormValues:any;
  fifthFormValues:any;
  sixthFormValues:any;

  // userFormValues:any;

  
  

  showSpinners = true;
  showSeconds = true;
  stepHour = 1;
  stepMinute = 1;
  stepSecond = 1;
  
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
  FormGroup: any;
  // selection: any;
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
      // datetime: ['', Validators.required],
      startLocation: ['', Validators.required],
      pickUpCtrl: ['', Validators.required],
      // pickUpQuantity:['', Validators.required],

      enrouteLocation:['', Validators.required],
      endDeliveryLocation:['', Validators.required],
      pickUpDelivery:['', Validators.required],
      Delivery:['', Validators.required],

      numberOfWheels:['', Validators.required],
      truckBodyType:['', Validators.required],
    
      // unitOfMeasurement:['', Validators.required],
    });


    //  pickUpDeliveryForm  dynamic form control
    this.pickUpDeliveryForm=this.fb.group({
      pickUpQuantity:['', Validators.required],
      pickUpQuantityUnitOfMeasurement:['', Validators.required],
      pickUpDelivery: this.fb.array([]) ,
    })


    // pickUpAndDeliveryQuantity dynamic form control
    this.pickUpAndDeliveryQuantityForm=this.fb.group({
      pickUpAndDeliveryQuantity: this.fb.array([]),
      })

      
    // pickUpAndDeliveryQuantity dynamic form control
    this.pickUpAndDeliveryQuantityForm1=this.fb.group({
      pickUpAndDeliveryQuantity1: this.fb.array([]),
    })

  // DeliveryQuantity dynamic form control
  this.deliveryForm=this.fb.group({
    DeliveryQuantity: this.fb.array([]) ,
  })

    this.secondFormGroup = this._formBuilder.group({
      notApplicable: ['', Validators.required],
      lumpSum:['', Validators.required],
      paymentTerm:['', Validators.required],
      paymentTerm3:['', Validators.required],
      indicateLumpsum:['', Validators.required],
      indicateLumpsum1:['', Validators.required],
    });

    this.thirdFormGroup = this._formBuilder.group({
         textControl1:['', Validators.required],
         textControl2:['', Validators.required],
    });

    this.forthFormGroup = this._formBuilder.group({
          file:['', Validators.required],
          addFromPreviousUpload:['', Validators.required],
    });

    this.fifthFormGroup = this._formBuilder.group({
      firstTextInput:['', Validators.required],
      secondTextInput:['', Validators.required],
      thirdTextInput:['', Validators.required],
    });

    this.sixthFormGroup = this._formBuilder.group({
    });



    this.businessGroupsWhoCanAccessDispatchDocumentsForm=this.fb.group({
      businessGroupsWhoCanAccessDispatchDocuments: this.fb.array([]) ,
    })



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
    console.log(this.fifthFormGroup.value);
    console.log(this.sixthFormGroup.value);
    console.log(this.pickUpDeliveryForm.value);
    console.log(this.pickUpAndDeliveryQuantityForm.value);
    console.log(this.pickUpAndDeliveryQuantityForm1.value);
    console.log(this.deliveryForm.value);

    console.log(this.businessGroupsWhoCanAccessDispatchDocumentsForm.value);

    this.firstformValues = this.firstFormGroup.value;
    this.secondformValues = this.secondFormGroup.value;
    this.thirdFormValues = this.thirdFormGroup.value;
    this.forthFormValues = this.forthFormGroup.value;
    this.fifthFormValues = this.fifthFormGroup.value;
    this.sixthFormValues = this.sixthFormGroup.value;
    this.pickUpDeliveryFormValues = this.pickUpDeliveryForm.value;
    this.pickUpAndDeliveryQuantityFormValues = this.pickUpAndDeliveryQuantityForm.value;
    this.pickUpAndDeliveryQuantityFormValues1 = this.pickUpAndDeliveryQuantityForm1.value;
    this.deliveryFormValues = this.deliveryForm.value;
    this.businessGroupsWhoCanAccessDispatchDocumentsFormValues = this.businessGroupsWhoCanAccessDispatchDocumentsForm.value;
  }

  
  ngOnInit() {
    this._headerTitle.setTitle('Stepper');
    this.getScreenSize();
    this.addPickUpAndDeliveryUnitOfMeasurement();
    this.addPickUpDelivery();
    this.addPickUpAndDeliveryUnitOfMeasurement1();
    this.addDelivery();
    this.addBusinessGroupsWhoCanAccessDispatchDocuments();
  }

  // animals = [
  //   { name: 'Dog', sound: 'Woof!' },
  //   { name: 'Cat', sound: 'Meow!' },
  //   { name: 'Cow', sound: 'Moo!' },
  //   { name: 'Fox', sound: 'Wa-pa-pa-pa-pa-pa-pow!' },
  //   ];

  numberOfWheels = [
    { name: '4 Wheeler' },
    { name: '6 Wheeler' },
    { name: '10 Wheeler' },
    { name: '12 Wheeler' },
    { name: '14 Wheeler' },
    { name: '16 Wheeler' },
    { name: '20 Wheeler' },
    { name: '24 Wheeler' },
    ];

  truckBodyTypes = [
    { name: 'Closed Body' },
    { name: 'With Out Body' },
    ];

  biz_names = [
        {name: 'Biz Name 1'},
        {name: 'Biz Name 2'},
        {name: 'Biz Name 3'},
        {name: 'Biz Name 4'},
        {name: 'Biz Name 5'},
        {name: 'Biz Name 6'},
        {name: 'Biz Name 7'},
        {name: 'Biz Name 8'},
    ];

  pickUps = [
    {name: 'Pick-Up'},
    ];

  deliverys = [
      {name: 'Delivery'},
    ];

  pickUpDeliverys = [
        {name: 'pick-Up + Delivery'},
      ];

  mts = [
      {name: 'MT'},
  ];

  enrouteLocations = [
      {name: 'Biz Name 1'},
      {name: 'Biz Name 2'},
      {name: 'Biz Name 3'},
      {name: 'Biz Name 4'},
      {name: 'Biz Name 5'},
      {name: 'Biz Name 6'},
      {name: 'Biz Name 7'},
      {name: 'Biz Name 8'},
    ];

  endDeliveryLocations = [
      {name: 'Biz Name 1'},
      {name: 'Biz Name 2'},
      {name: 'Biz Name 3'},
      {name: 'Biz Name 4'},
      {name: 'Biz Name 5'},
      {name: 'Biz Name 6'},
      {name: 'Biz Name 7'},
      {name: 'Biz Name 8'},
  ];

  notApplicables = [
      {name: 'Not Applicable'},
  ]

  lumpSums = [
      {name: 'Lump Sum'},
  ]
  
    paymentTerms = [
      {name: '70% Advance, 30% on POD'},
      {name: '50% Advance, 30% on POD'},
      {name: '40% Advance, 30% on POD'},
      {name: '30% Advance, 30% on POD'},

    ]

    paymentTerms3=[
      {name: '70% Advance, 30% on POD'},
      {name: '50% Advance, 30% on POD'},
      {name: '40% Advance, 30% on POD'},
      {name: '30% Advance, 30% on POD'},
    ]

    unitOfMeasurement=[
      {name: 'MT'},
    ]

    addfrompreviousuploads = [
        { name: 'Add from previous uploads' },
    ];

    // table code 
    filterValue = '';
    applyFilter(event: Event) {
      this.filterValue = (event.target as HTMLInputElement).value;
      this.filterValue = this.filterValue.trim(); // Remove whitespace
      this.filterValue = this.filterValue.toLowerCase(); // Datasource defaults to lowercase matches
      this.dataSource.filter = this.filterValue;
    }
    
    
  
    displayedColumns: string[] = ['select','document_name','document_ref_no', 'business_groups_who_can_access_dispatch_documents'];
  
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    selection = new SelectionModel<PeriodicElement>(true, []);

    @ViewChild(MatPaginator) paginator!: MatPaginator;
  
    @ViewChild('paginatorElement', { read: ElementRef })
    paginatorHtmlElement!: ElementRef;
  

    rowValue: any[] = [];

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
      const numSelected = this.selection.selected.length;
      // console.log(this.selection.selected);
      this.rowValue = this.selection.selected;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }
  
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
      this.isAllSelected()
        ? this.selection.clear()
        : this.dataSource.data.forEach((row) => this.selection.select(row));
    }

    pageSizeOptions: { [key: string]: string } = {
      5: '5',
      10: '10',
      25: '25',
      100: 'All',
    };
    showPageSizeOptions: boolean = true;

    
  
  
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














  // last screen first table 
  filterValue2 = '';
  applyFilter2(event: Event) {
    this.filterValue2 = (event.target as HTMLInputElement).value;
    this.filterValue2 = this.filterValue2.trim(); // Remove whitespace
    this.filterValue2 = this.filterValue2.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = this.filterValue2;
  }

  
  displayedColumns2: string[] = ['select2','user_name','face_id', 'user_category', 'access_to_dispatch_documents'];

  dataSource2 = new MatTableDataSource<PeriodicElement2>(ELEMENT_DATA2);
  selection2 = new SelectionModel<PeriodicElement2>(true, []);

  @ViewChild(MatPaginator) paginator2!: MatPaginator;

  @ViewChild('paginatorElement', { read: ElementRef })
  paginatorHtmlElement2!: ElementRef;

  rowValue2: any[] = [];

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected2() {
      const numSelected2 = this.selection2.selected.length;
      // console.log(this.selection.selected);
      this.rowValue2 = this.selection2.selected;
      const numRows2 = this.dataSource2.data.length;
      return numSelected2 === numRows2;
    }
  
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle2() {
      this.isAllSelected2()
        ? this.selection2.clear()
        : this.dataSource2.data.forEach((row2) => this.selection2.select(row2));
    }

    pageSizeOptions2: { [key: string]: string } = {
      5: '5',
      10: '10',
      25: '25',
      100: 'All',
    };
    showPageSizeOptions2: boolean = true;

    



  translateMatPaginator2(paginator2: MatPaginator) {
    paginator2._intl.firstPageLabel = 'First';
    paginator2._intl.itemsPerPageLabel = 'Records Per Page';
    paginator2._intl.lastPageLabel = 'Last';
    paginator2._intl.nextPageLabel = 'Next';
    paginator2._intl.previousPageLabel = 'Previous';
  }



    // last screen second table 
  filterValue3 = '';
  applyFilter3(event: Event) {
    this.filterValue3 = (event.target as HTMLInputElement).value;
    this.filterValue3 = this.filterValue3.trim(); // Remove whitespace
    this.filterValue3 = this.filterValue3.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = this.filterValue3;
  }

  displayedColumns3: string[] = ['select3','user_name','face_id', 'user_category', 'access_to_dispatch_documents'];
  dataSource3 = new MatTableDataSource<PeriodicElement3>(ELEMENT_DATA3);
  selection3 = new SelectionModel<PeriodicElement3>(true, []);


  @ViewChild(MatPaginator) paginator3!: MatPaginator;

  @ViewChild('paginatorElement', { read: ElementRef })
  paginatorHtmlElement3!: ElementRef;


  
  rowValue3: any[] = [];

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected3() {
      const numSelected3 = this.selection3.selected.length;
      // console.log(this.selection.selected);
      this.rowValue3 = this.selection3.selected;
      const numRows3 = this.dataSource3.data.length;
      return numSelected3 === numRows3;
    }
  
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle3() {
      this.isAllSelected3()
        ? this.selection3.clear()
        : this.dataSource3.data.forEach((row3) => this.selection2.select(row3));
    }

    pageSizeOptions3: { [key: string]: string } = {
      5: '5',
      10: '10',
      25: '25',
      100: 'All',
    };
    showPageSizeOptions3: boolean = true;

    


  translateMatPaginator3(paginator3: MatPaginator) {
    paginator3._intl.firstPageLabel = 'First';
    paginator3._intl.itemsPerPageLabel = 'Records Per Page';
    paginator3._intl.lastPageLabel = 'Last';
    paginator3._intl.nextPageLabel = 'Next';
    paginator3._intl.previousPageLabel = 'Previous';
  }




  
    // last screen 3rd table 
    filterValue4 = '';
    applyFilter4(event: Event) {
      this.filterValue4 = (event.target as HTMLInputElement).value;
      this.filterValue4 = this.filterValue4.trim(); // Remove whitespace
      this.filterValue4 = this.filterValue4.toLowerCase(); // Datasource defaults to lowercase matches
      this.dataSource.filter = this.filterValue4;
    }
  
    displayedColumns4: string[] = ['select4','user_name','face_id', 'user_category', 'access_to_dispatch_documents'];
    dataSource4 = new MatTableDataSource<PeriodicElement4>(ELEMENT_DATA4);
    selection4 = new SelectionModel<PeriodicElement4>(true, []);


    @ViewChild(MatPaginator) paginator4!: MatPaginator;
  
    @ViewChild('paginatorElement', { read: ElementRef })
    paginatorHtmlElement4!: ElementRef;
  

    rowValue4: any[] = [];

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected4() {
      const numSelected4 = this.selection4.selected.length;
      // console.log(this.selection.selected);
      this.rowValue4 = this.selection4.selected;
      const numRows4 = this.dataSource4.data.length;
      return numSelected4 === numRows4;
    }
  
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle4() {
      this.isAllSelected4()
        ? this.selection4.clear()
        : this.dataSource4.data.forEach((row4) => this.selection4.select(row4));
    }

    pageSizeOptions4: { [key: string]: string } = {
      5: '5',
      10: '10',
      25: '25',
      100: 'All',
    };
    showPageSizeOptions4: boolean = true;


  
    translateMatPaginator4(paginator4: MatPaginator) {
      paginator4._intl.firstPageLabel = 'First';
      paginator4._intl.itemsPerPageLabel = 'Records Per Page';
      paginator4._intl.lastPageLabel = 'Last';
      paginator4._intl.nextPageLabel = 'Next';
      paginator4._intl.previousPageLabel = 'Previous';
    }



// file uploading code 

@ViewChild('fileInput') fileInput: ElementRef;
fileAttr = 'Choose File';
uploadFileEvt(imgFile: any) {
  if (imgFile.target.files && imgFile.target.files[0]) {
    this.fileAttr = '';
    Array.from(imgFile.target.files).forEach((file: any) => {
      this.fileAttr += file.name + ' - ';
    });
    // HTML5 FileReader API
    let reader = new FileReader();
    reader.onload = (e: any) => {
      let image = new Image();
      image.src = e.target.result;
      image.onload = (rs) => {
        let imgBase64Path = e.target.result;
      };
    };
    reader.readAsDataURL(imgFile.target.files[0]);
    // Reset if duplicate image uploaded again
    this.fileInput.nativeElement.value = '';
  } else {
    this.fileAttr = 'Choose File';
  }
}


// 1 pickUpAndDeliveryQuantity dynamic form
pickUpDelivery(): FormArray {
  return this.pickUpDeliveryForm.get("pickUpDelivery") as FormArray
}
newPickUpDelivery(): FormGroup {
  return this.fb.group({
    pickUpQuantity: '',
    pickUpQuantityUnitOfMeasurement: ''
  })
}
addPickUpDelivery() {
  this.pickUpDelivery().push(this.newPickUpDelivery());
}
removePickUpDelivery(Index:number) {
  this.pickUpDelivery().removeAt(Index);
}








// 2 pickUpAndDeliveryQuantity dynamic form
pickUpAndDeliveryQuantity(): FormArray {
  return this.pickUpAndDeliveryQuantityForm.get("pickUpAndDeliveryQuantity") as FormArray
}
newPickUpAndDeliveryUnitOfMeasurement(): FormGroup {
  return this._formBuilder.group({
    pickUpAndDeliveryQuantity: '',
    pickUpAndDeliveryUnitOfMeasurement: '',
  })
}
addPickUpAndDeliveryUnitOfMeasurement() {
  this.pickUpAndDeliveryQuantity().push(this.newPickUpAndDeliveryUnitOfMeasurement());
}
removePickUpAndDeliveryUnitOfMeasurement(empIndex:number) {
  this.pickUpAndDeliveryQuantity().removeAt(empIndex);
}





// 3 pickUpAndDeliveryQuantity dynamic form

pickUpAndDeliveryQuantity1(): FormArray {
  return this.pickUpAndDeliveryQuantityForm1.get("pickUpAndDeliveryQuantity1") as FormArray
}
newPickUpAndDeliveryUnitOfMeasurement1(): FormGroup {
  return this._formBuilder.group({
    pickUpAndDeliveryQuantity1: '',
    pickUpAndDeliveryUnitOfMeasurement1: '',
  })
}
addPickUpAndDeliveryUnitOfMeasurement1() {
  this.pickUpAndDeliveryQuantity1().push(this.newPickUpAndDeliveryUnitOfMeasurement1());
}
removePickUpAndDeliveryUnitOfMeasurement1(empIndex:number) {
  this.pickUpAndDeliveryQuantity1().removeAt(empIndex);
}



// 4 pickUpAndDeliveryQuantity dynamic form
DeliveryQuantity(): FormArray {
  return this.deliveryForm.get("DeliveryQuantity") as FormArray
}
newDelivery(): FormGroup {
  return this.fb.group({
    deliveryQuantity: '',
    deliveryQuantityUnitOfMeasurement: '',
  })
}
addDelivery() {
  this.DeliveryQuantity().push(this.newDelivery());
}
removeDelivery(empIndex:number) {
  this.DeliveryQuantity().removeAt(empIndex);
}






// last dynamic form
BusinessGroupsWhoCanAccessDispatchDocuments(): FormArray {
  return this.businessGroupsWhoCanAccessDispatchDocumentsForm.get("businessGroupsWhoCanAccessDispatchDocuments") as FormArray
}
newBusinessGroupsWhoCanAccessDispatchDocuments(): FormGroup {
  return this.fb.group({
    businessGroupsWhoCanAccessDispatchDocumentsData: '',
  })
}
addBusinessGroupsWhoCanAccessDispatchDocuments() {
  this.BusinessGroupsWhoCanAccessDispatchDocuments().push(this.newBusinessGroupsWhoCanAccessDispatchDocuments());
}
removeBusinessGroupsWhoCanAccessDispatchDocuments(empIndex:number) {
  this.BusinessGroupsWhoCanAccessDispatchDocuments().removeAt(empIndex);
}
}







 // Add/Edit Freight Plan table


 export interface PeriodicElement {
  document_name:any;
  document_ref_no:any;
  business_groups_who_can_access_dispatch_documents: any;
}


const ELEMENT_DATA: PeriodicElement[] = [
  {document_name: "Biz 3 Load Plan", document_ref_no: '023123',business_groups_who_can_access_dispatch_documents: 'test'},
  // {document_name: "Biz 3 Load Plan", document_ref_no: '128974',business_groups_who_can_access_dispatch_documents: 'test'},
];






// last screen fist table 
export interface PeriodicElement2 {
  user_name: any;
  face_id: any;
  user_category: any;
  access_to_dispatch_documents: any;
}

const ELEMENT_DATA2: PeriodicElement2[] = [
  {
    user_name: "suresh",
    face_id: 'Hydrogen',
    user_category: "1.0079",
    access_to_dispatch_documents: 'H',
  },

];




// last screen second table 
export interface PeriodicElement3 {
  user_name: any;
  face_id: any;
  user_category: any;
  access_to_dispatch_documents: any;
}

const ELEMENT_DATA3: PeriodicElement3[] = [
  {
    user_name: "sudhagar",
    face_id: 'Hydrogen',
    user_category: "1.0079",
    access_to_dispatch_documents: 'H',
  },

];




// last screen forth table 
export interface PeriodicElement4 {
  user_name: any;
  face_id: any;
  user_category: any;
  access_to_dispatch_documents: any;
}

const ELEMENT_DATA4: PeriodicElement4[] = [
  {
    user_name: "mugil",
    face_id: 'Hydrogen',
    user_category: "1.0079",
    access_to_dispatch_documents: 'H',
  },

];





