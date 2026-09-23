import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { RequestNotificaionsComponent } from 'src/app/shared/dialogs/request-notificaions/request-notificaions.component';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-track-freight',
  templateUrl: './track-freight.component.html',
  styleUrls: ['./track-freight.component.scss']
})
export class TrackFreightComponent implements OnInit {


  ngOnInit(): void {
  }


  constructor(private _httpClient: HttpClient,
    public dialog: MatDialog,
    ) {}

  filterValue = '';
  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.filterValue = this.filterValue.trim(); // Remove whitespace
    this.filterValue = this.filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = this.filterValue;
  }

  displayedColumns: string[] = ['route', 'freight_required_date_time','tracking_device_id','documentation_ref_nos','delivery_status'];




  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);




  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild('paginatorElement', { read: ElementRef })
  paginatorHtmlElement!: ElementRef;



  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    // this.dataSource1.paginator = this.paginator;

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


  // open dialog box 
  openloginDialog() {
    const dialogRef = this.dialog.open(RequestNotificaionsComponent, {
      width: '400px',
      height: '350px',
    });
    dialogRef.afterClosed().subscribe((result) => {
    });
  }

}




// table 1

export interface PeriodicElement {
  route:string;
  freight_required_date_time: string;
  tracking_device_id: string;
  documentation_ref_nos:string;
  delivery_status:string;
}

const ELEMENT_DATA: PeriodicElement[] = [
                     {route: 'Hydrogenggggggggggggggggggggg',freight_required_date_time:'12-02-2022 12:23 344444444444444444444444444444',tracking_device_id:"+91 877883301566666666666666",documentation_ref_nos:"testttttttttttttttttttttttttttttttttt",delivery_status:"Delivery Statusssssssssssssssssssssssssssssssss"},
                     {route: 'Hydrogen',freight_required_date_time:'12-02-2022',tracking_device_id:"",documentation_ref_nos:"",delivery_status:"Delivered and POD issued Awaiting POD"},
                     {route: 'Hydrogen',freight_required_date_time:'12-02-2022',tracking_device_id:"",documentation_ref_nos:"",delivery_status:""},
                     {route: 'Hydrogen',freight_required_date_time:'12-02-2022',tracking_device_id:"",documentation_ref_nos:"",delivery_status:""},
                     {route: 'Hydrogen',freight_required_date_time:'12-02-2022',tracking_device_id:"",documentation_ref_nos:"",delivery_status:""},
                     {route: 'Hydrogen',freight_required_date_time:'12-02-2022',tracking_device_id:"",documentation_ref_nos:"",delivery_status:""},
];



