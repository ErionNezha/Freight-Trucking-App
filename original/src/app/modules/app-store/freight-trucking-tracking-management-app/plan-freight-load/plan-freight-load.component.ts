import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatRadioButton } from '@angular/material/radio';
import { MatTableDataSource } from '@angular/material/table';
import { HeaderTitleService } from 'src/app/shared/services/header-title/header-title.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-plan-freight-load',
  templateUrl: './plan-freight-load.component.html',
  styleUrls: ['./plan-freight-load.component.scss']
})
export class PlanFreightLoadComponent implements OnInit {

 

  constructor(
    private _httpClient: HttpClient,
    private _headerTitle: HeaderTitleService
    ) {  
  }

  @ViewChild('radio') radio: MatRadioButton;

  ngOnInit(): void {
    this._headerTitle.setTitle('Table');
  }
  
  filterValue = '';
  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.filterValue = this.filterValue.trim(); // Remove whitespace
    this.filterValue = this.filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = this.filterValue;
  }
  
  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  displayedColumns: string[] = ['freight_plan_id','route', 'freight_required_date_time', 'images_of_goods_to_be_transported','total_freight_delivery_quantity','freight_plan_added_by'];

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


}































































export interface PeriodicElement {
  freight_plan_id:number;
  route:string;
  freight_required_date_time: string;
  images_of_goods_to_be_transported: string;
  total_freight_delivery_quantity: string;
  freight_plan_added_by: string;
}



const ELEMENT_DATA: PeriodicElement[] = [
                     {freight_plan_id: 34342,route: 'Biz Name 1 .Hosur, Krishnagiri Biz Name 2 .Sivakasi, Virudhunagar ', freight_required_date_time: 'immediate',images_of_goods_to_be_transported: '',total_freight_delivery_quantity:'10 MT +2 No',freight_plan_added_by:'Krishna Kumar'},
                     {freight_plan_id: 34342,route: 'Biz Name 1 .Hosur, Krishnagiri Biz Name 2 .Sivakasi, Virudhunagar ', freight_required_date_time: 'immediate',images_of_goods_to_be_transported: '',total_freight_delivery_quantity:'10 MT +2 No',freight_plan_added_by:'Krishna Kumar'},
                     {freight_plan_id: 34342,route: '', freight_required_date_time: '',images_of_goods_to_be_transported: 'H',total_freight_delivery_quantity:'',freight_plan_added_by:' '},
                     {freight_plan_id: 34342,route: '', freight_required_date_time: '',images_of_goods_to_be_transported: 'H',total_freight_delivery_quantity:'',freight_plan_added_by:' '},
                     {freight_plan_id: 34342,route: '', freight_required_date_time: '',images_of_goods_to_be_transported: 'H',total_freight_delivery_quantity:'',freight_plan_added_by:' '},
                     {freight_plan_id: 34342,route: '', freight_required_date_time: '',images_of_goods_to_be_transported: 'H',total_freight_delivery_quantity:'',freight_plan_added_by:' '},
                     {freight_plan_id: 34342,route: '', freight_required_date_time: '',images_of_goods_to_be_transported: 'H',total_freight_delivery_quantity:'',freight_plan_added_by:' '},
                     {freight_plan_id: 34454563645,route: 'BizName1.Hosur,KrishnagiriBizName2', freight_required_date_time: 'immediateeeeeeeeeeeeeeeee',images_of_goods_to_be_transported: '',total_freight_delivery_quantity:'10 MT +2 Noooooooooooooooooooooo',freight_plan_added_by:'Krishna Kumarrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr'},
                     {freight_plan_id: 34342,route: '', freight_required_date_time: '',images_of_goods_to_be_transported: 'H',total_freight_delivery_quantity:'',freight_plan_added_by:' '},
                     {freight_plan_id: 34342,route: '', freight_required_date_time: '',images_of_goods_to_be_transported: 'H',total_freight_delivery_quantity:'',freight_plan_added_by:' '},
                     {freight_plan_id: 34342,route: '', freight_required_date_time: '',images_of_goods_to_be_transported: 'H',total_freight_delivery_quantity:'',freight_plan_added_by:' '},


                     
];