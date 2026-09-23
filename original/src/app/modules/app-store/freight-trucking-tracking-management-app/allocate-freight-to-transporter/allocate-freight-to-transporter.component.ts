import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LoginComponent } from 'src/app/shared/dialogs/login/login.component';
import { RequestNotificaionsComponent } from 'src/app/shared/dialogs/request-notificaions/request-notificaions.component';
import * as XLSX from 'xlsx';
import { SelectionModel } from '@angular/cdk/collections';


@Component({
  selector: 'app-allocate-freight-to-transporter',
  templateUrl: './allocate-freight-to-transporter.component.html',
  styleUrls: ['./allocate-freight-to-transporter.component.scss']
})
export class AllocateFreightToTransporterComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private _httpClient: HttpClient
    ) {}

    
  ngOnInit(): void {}

  openloginDialog() {
    const dialogRef = this.dialog.open(RequestNotificaionsComponent, {
      width: '400px',
      height: '350px',
    });
    dialogRef.afterClosed().subscribe((result) => {
    });
  }


  filterValue = '';
  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.filterValue = this.filterValue.trim(); // Remove whitespace
    this.filterValue = this.filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = this.filterValue;
  }

  displayedColumns: string[] = ['select','freight_plan_id','route', 'freight_required_date_time','total_freight_delivery_quantity','status'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  selection = new SelectionModel<PeriodicElement>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild('paginatorElement', { read: ElementRef })
  paginatorHtmlElement!: ElementRef;




  rowValue: any[] = [];

  // record select code 
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
  freight_plan_id:number;
  route:string;
  freight_required_date_time: string;
   total_freight_delivery_quantity: string;
   status: string;
}


const ELEMENT_DATA: PeriodicElement[] = [
                     {freight_plan_id: 34342,route: 'Biz Name 1  Hosur, Krishnagiri Biz Name 2 Sivakasi, Virudhunagar',freight_required_date_time:'',total_freight_delivery_quantity:'10MT +2 Nos',status:"No Invites send"},
                     {freight_plan_id: 34342,route: 'Biz Name 2  Hosur, Krishnagiri Biz Name 2 Sivakasi, Virudhunagar',freight_required_date_time:'',total_freight_delivery_quantity:'',status:"Invites Viewed by: Transporter 1,Transporter 2,Transporter 3,Transporter 4"},
                     {freight_plan_id: 34342,route: '',freight_required_date_time:'',total_freight_delivery_quantity:'',status:"Bids Received. L1 bidder:Transporter 3, Freight Allocate to Transporter 3"},
                     {freight_plan_id: 34342,route: '',freight_required_date_time:'',total_freight_delivery_quantity:'',status:""},
                     {freight_plan_id: 34342,route: 'BizName1Hosur,Krishnagiri_BizName2',freight_required_date_time:'Immediateeeeeeeeeeeeeeeeeee',total_freight_delivery_quantity:'10MT+2Nosssssssssssssssss',status:"InvitesViewedby:Transporter1,Transporter2,Transporter3,Transporter4Transporter"},
                     {freight_plan_id: 34342,route: '',freight_required_date_time:'',total_freight_delivery_quantity:'',status:""},
                     {freight_plan_id: 34342,route: '',freight_required_date_time:'',total_freight_delivery_quantity:'',status:""},
                     {freight_plan_id: 34342,route: '',freight_required_date_time:'',total_freight_delivery_quantity:'',status:""},
                     {freight_plan_id: 34342,route: '',freight_required_date_time:'',total_freight_delivery_quantity:'',status:""},

                     {freight_plan_id: 34342,route: '',freight_required_date_time:'',total_freight_delivery_quantity:'',status:""},
                     
];





