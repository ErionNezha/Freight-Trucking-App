import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-allocate-freight',
  templateUrl: './allocate-freight.component.html',
  styleUrls: ['./allocate-freight.component.scss']
})
export class AllocateFreightComponent implements OnInit {


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


  displayedColumns: string[] = ['select','trucker_transporter_name','quotation_bid_value','name_of_the_user_who_has_quoted_bid'];

  displayedColumns1: string[] = ['select','trucker_transporter_name','key_contact_user_name','reg_mobile_no','areas_serviced_by_the_transporter'];


  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  dataSource1 = new MatTableDataSource<PeriodicElement1>(ELEMENT_DATA1);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild('paginatorElement', { read: ElementRef })
  paginatorHtmlElement!: ElementRef;



   ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;      // paginator code 
    this.dataSource1.paginator = this.paginator;
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
  select:any;
  trucker_transporter_name:any;
  quotation_bid_value:any;
  name_of_the_user_who_has_quoted_bid:any;
}



const ELEMENT_DATA: PeriodicElement[] = [
                      {select: '123',trucker_transporter_name: 'Transporer 1',quotation_bid_value:'26000.00',name_of_the_user_who_has_quoted_bid:'Syad Ifthar'}, 
                      {select: '123',trucker_transporter_name: 'Transporer 17',quotation_bid_value:'Not Bid Yet',name_of_the_user_who_has_quoted_bid:''}, 
                      {select: '123',trucker_transporter_name: '',quotation_bid_value:'',name_of_the_user_who_has_quoted_bid:''}, 
                      {select: '123',trucker_transporter_name: '',quotation_bid_value:'',name_of_the_user_who_has_quoted_bid:''}, 
                      {select: '123',trucker_transporter_name: '',quotation_bid_value:'',name_of_the_user_who_has_quoted_bid:''}, 
                      {select: '123',trucker_transporter_name: '',quotation_bid_value:'',name_of_the_user_who_has_quoted_bid:''}, 
                      {select: '123',trucker_transporter_name: '',quotation_bid_value:'',name_of_the_user_who_has_quoted_bid:''}, 
                      {select: '123',trucker_transporter_name: '',quotation_bid_value:'',name_of_the_user_who_has_quoted_bid:''},                                         
];





export interface PeriodicElement1 {
  select:any; 
  trucker_transporter_name:any;
  key_contact_user_name:any;
  reg_mobile_no:any;
  areas_serviced_by_the_transporter:any;
}



const ELEMENT_DATA1: PeriodicElement1[] = [
  {select: '123 ',trucker_transporter_name:'Transporer 1',key_contact_user_name:'Syad Ifthar',reg_mobile_no:'+91 9545519584',areas_serviced_by_the_transporter:''}, 
  {select: '123 ',trucker_transporter_name:'',key_contact_user_name:'',reg_mobile_no:'',areas_serviced_by_the_transporter:''},                                         
  {select: '123 ',trucker_transporter_name:'',key_contact_user_name:'',reg_mobile_no:'',areas_serviced_by_the_transporter:''},                                         
  {select: '123 ',trucker_transporter_name:'',key_contact_user_name:'',reg_mobile_no:'',areas_serviced_by_the_transporter:''},                                         
  {select: '123 ',trucker_transporter_name:'',key_contact_user_name:'',reg_mobile_no:'',areas_serviced_by_the_transporter:''},                                         
  {select: '123 ',trucker_transporter_name:'',key_contact_user_name:'',reg_mobile_no:'',areas_serviced_by_the_transporter:''},                                         
  {select: '123 ',trucker_transporter_name:'',key_contact_user_name:'',reg_mobile_no:'',areas_serviced_by_the_transporter:''},                                         
  {select: '123 ',trucker_transporter_name:'',key_contact_user_name:'',reg_mobile_no:'',areas_serviced_by_the_transporter:''},                                         
  {select: '123 ',trucker_transporter_name:'',key_contact_user_name:'',reg_mobile_no:'',areas_serviced_by_the_transporter:''},                                         
  {select: '123 ',trucker_transporter_name:'',key_contact_user_name:'',reg_mobile_no:'',areas_serviced_by_the_transporter:''},                                         
  {select: '123 ',trucker_transporter_name:'',key_contact_user_name:'',reg_mobile_no:'',areas_serviced_by_the_transporter:''},                                         
                                        
];
