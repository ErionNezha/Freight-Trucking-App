import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-edit-user-permissions',
  templateUrl: './edit-user-permissions.component.html',
  styleUrls: ['./edit-user-permissions.component.scss']
})
export class EditUserPermissionsComponent implements OnInit {


  ngOnInit(): void {
  }


  constructor(private _httpClient: HttpClient) {}

  filterValue = '';
  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.filterValue = this.filterValue.trim(); // Remove whitespace
    this.filterValue = this.filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = this.filterValue;
  }

  displayedColumns: string[] = ['user_name','face_id', 'reg_mobile_no', 'user_category','access_to_dispatch_documents','quote_freight_rates','provide_support_to_driver_rider_transporter'];

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
        '   content: "Page " counter(page)' +
        '}' +
        '</style>' +
        '</head><body onload="window.print();window.close()">' +
        '<h1 style="text-align: center;font-size:30px">Welcome to GETster.TECH</h1>' +
        '<h6 style="text-align: center;">Audit Trail</h6>' +
        printContents +
        '</body></html>'
    );
    popupWin.document.close();
  }
}






export interface PeriodicElement {
  user_name:any;
  face_id:string;
  reg_mobile_no: string;
  user_category: string;
  access_to_dispatch_documents: string;
  quote_freight_rates:any
  provide_support_to_driver_rider_transporter:any;
}



const ELEMENT_DATA: PeriodicElement[] = [
                     {user_name: 'suresh',face_id: '', reg_mobile_no: '+91 8778833015',user_category: 'Transporter',access_to_dispatch_documents:'',quote_freight_rates:'',provide_support_to_driver_rider_transporter:''},
                     {user_name: 'sudhagar',face_id: '', reg_mobile_no: '+91 9545519584',user_category: '',access_to_dispatch_documents:'',quote_freight_rates:'',provide_support_to_driver_rider_transporter:''},
                     {user_name: 'edwin',face_id: '', reg_mobile_no: '+91 9387452198',user_category: '',access_to_dispatch_documents:'',quote_freight_rates:'',provide_support_to_driver_rider_transporter:''},
                     {user_name: 'vignesh ',face_id: '', reg_mobile_no: '+91 7198542102',user_category: 'App administrator',access_to_dispatch_documents:'',quote_freight_rates:'',provide_support_to_driver_rider_transporter:''},
                     {user_name: 'mani',face_id: '', reg_mobile_no: '+91 8587216578',user_category: 'App administrator',access_to_dispatch_documents:'',quote_freight_rates:'',provide_support_to_driver_rider_transporter:''},
                     {user_name: 'sathish',face_id: '', reg_mobile_no: '+91 9545519584',user_category: 'App administrator',access_to_dispatch_documents:'',quote_freight_rates:'',provide_support_to_driver_rider_transporter:''},
                     
];

  












