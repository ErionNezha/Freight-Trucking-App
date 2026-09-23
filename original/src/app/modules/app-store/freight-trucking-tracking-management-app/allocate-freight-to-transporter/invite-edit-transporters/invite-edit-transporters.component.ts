import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HeaderTitleService } from 'src/app/shared/services/header-title/header-title.service';
import * as XLSX from 'xlsx';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-invite-edit-transporters',
  templateUrl: './invite-edit-transporters.component.html',
  styleUrls: ['./invite-edit-transporters.component.scss']
})
export class InviteEditTransportersComponent implements OnInit {
  
  ngOnInit() {
    this._headerTitle.setTitle('Table');
  }

  constructor(
    private _httpClient: HttpClient,
    private _headerTitle: HeaderTitleService
    ) {}
      

  filterValue = '';
  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.filterValue = this.filterValue.trim(); // Remove whitespace
    this.filterValue = this.filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = this.filterValue;
  }

  // displayedColumns: string[] = ['invite','trucker_transporter_name','key_contact_user_name,reg_mobile_no,areas_serviced_by_the_transporter'];
  displayedColumns: string[] = ['select','invite','trucker_transporter_name','key_contact_user_name','reg_mobile_no','areas_serviced_by_the_transporter'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild('paginatorElement', { read: ElementRef })
  paginatorHtmlElement!: ElementRef;



  // select record in table1 
   // select table row 
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
    this.translateMatPaginator(this.paginator);    // paginator code 
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

}

export interface PeriodicElement {
  invite:any;
  trucker_transporter_name:any;
  key_contact_user_name:any;
  reg_mobile_no:any;
  areas_serviced_by_the_transporter:any;
}


const ELEMENT_DATA: PeriodicElement[] = [
                      {invite: '123',trucker_transporter_name: 'Transporer 1',key_contact_user_name: 'Syad Ifthar',reg_mobile_no:'8778833015',areas_serviced_by_the_transporter:'' }, 
                      {invite: '123',trucker_transporter_name: '',key_contact_user_name: '',reg_mobile_no:'',areas_serviced_by_the_transporter:'' }, 
                      {invite: '123',trucker_transporter_name: '',key_contact_user_name: '',reg_mobile_no:'',areas_serviced_by_the_transporter:'' }, 
                      {invite: '123',trucker_transporter_name: '',key_contact_user_name: '',reg_mobile_no:'',areas_serviced_by_the_transporter:'' }, 
                      {invite: '123',trucker_transporter_name: '',key_contact_user_name: '',reg_mobile_no:'',areas_serviced_by_the_transporter:'' }, 
                      {invite: '123',trucker_transporter_name: '',key_contact_user_name: '',reg_mobile_no:'',areas_serviced_by_the_transporter:'' }, 
                      {invite: '123',trucker_transporter_name: '',key_contact_user_name: '',reg_mobile_no:'',areas_serviced_by_the_transporter:'' }, 
                      {invite: '123',trucker_transporter_name: '',key_contact_user_name: '',reg_mobile_no:'',areas_serviced_by_the_transporter:'' }, 
                      {invite: '123',trucker_transporter_name: '',key_contact_user_name: '',reg_mobile_no:'',areas_serviced_by_the_transporter:'' }, 
                      {invite: '123',trucker_transporter_name: '',key_contact_user_name: '',reg_mobile_no:'',areas_serviced_by_the_transporter:'' }, 
                      {invite: '123',trucker_transporter_name: '',key_contact_user_name: '',reg_mobile_no:'',areas_serviced_by_the_transporter:'' }, 
                      {invite: '123',trucker_transporter_name: '',key_contact_user_name: '',reg_mobile_no:'',areas_serviced_by_the_transporter:'' }, 
                      {invite: '123',trucker_transporter_name: '',key_contact_user_name: '',reg_mobile_no:'',areas_serviced_by_the_transporter:'' }, 
                      {invite: '123',trucker_transporter_name: '',key_contact_user_name: '',reg_mobile_no:'',areas_serviced_by_the_transporter:'' }, 
                      {invite: '123',trucker_transporter_name: '',key_contact_user_name: '',reg_mobile_no:'',areas_serviced_by_the_transporter:'' }, 
                      {invite: '123',trucker_transporter_name: '',key_contact_user_name: '',reg_mobile_no:'',areas_serviced_by_the_transporter:'' }, 
                      {invite: '123',trucker_transporter_name: '',key_contact_user_name: '',reg_mobile_no:'',areas_serviced_by_the_transporter:'' }, 

                                     
];
