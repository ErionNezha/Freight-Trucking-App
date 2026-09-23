import { SelectionModel } from '@angular/cdk/collections';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { HeaderTitleService } from 'src/app/shared/services/header-title/header-title.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-audi-trail-table',
  templateUrl: './audi-trail-table.component.html',
  styleUrls: ['./audi-trail-table.component.scss'],
})
export class AudiTrailTableComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild('paginatorElement', { read: ElementRef })
  paginatorHtmlElement!: ElementRef;

  @ViewChild(MatTable, { static: true }) table!: MatTable<any>;

  selection = new SelectionModel<any>(false, []);
  clickedRow = new Set<any>();
  highlightedRows: any[] = [];
  pageLoading:boolean=false;

  displayedColumns: string[] = [
    'entry_description',
    'entry_type',
    'entry_date_time',
    'entry_by_user_name',
    'entry_by_user_category',
  ];

  ELEMENT_DATA: any[] = [
    {
      entry_description: '1',
      entry_type: '2',
      entry_date_time: 'hello',
      entry_by_user_name: 'one',
      entry_by_user_category: 'yes',
    },
    {
      entry_description: '1.1',
      entry_type: '2.2',
      entry_date_time: 'hello',
      entry_by_user_name: 'two',
      entry_by_user_category: 'yes',
    },
    {
      entry_description: '3',
      entry_type: '3.1',
      entry_date_time: 'hello',
      entry_by_user_name: 'one',
      entry_by_user_category: 'yes',
    },
    {
      entry_description: '4',
      entry_type: '4.1',
      entry_date_time: 'hello',
      entry_by_user_name: 'two',
      entry_by_user_category: 'yes',
    },
    {
      entry_description: '3',
      entry_type: '3.1',
      entry_date_time: 'hello',
      entry_by_user_name: 'one',
      entry_by_user_category: 'yes',
    },
    {
      entry_description: '4',
      entry_type: '4.1',
      entry_date_time: 'hello',
      entry_by_user_name: 'two',
      entry_by_user_category: 'yes',
    },
    {
      entry_description: '3',
      entry_type: '3.1',
      entry_date_time: 'hello',
      entry_by_user_name: 'one',
      entry_by_user_category: 'yes',
    },
    {
      entry_description: '4',
      entry_type: '4.1',
      entry_date_time: 'hello',
      entry_by_user_name: 'two',
      entry_by_user_category: 'yes',
    },
    {
      entry_description: '3',
      entry_type: '3.1',
      entry_date_time: 'hello',
      entry_by_user_name: 'one',
      entry_by_user_category: 'yes',
    },
    {
      entry_description: '4',
      entry_type: '4.1',
      entry_date_time: 'hello',
      entry_by_user_name: 'two',
      entry_by_user_category: 'yes',
    },
    {
      entry_description: '3',
      entry_type: '3.1',
      entry_date_time: 'hello',
      entry_by_user_name: 'one',
      entry_by_user_category: 'yes',
    },
    {
      entry_description: '4',
      entry_type: '4.1',
      entry_date_time: 'hello',
      entry_by_user_name: 'two',
      entry_by_user_category: 'yes',
    },
    {
      entry_description: '4',
      entry_type: '4.1',
      entry_date_time: 'hello',
      entry_by_user_name: 'two',
      entry_by_user_category: 'yes',
    },
    {
      entry_description: '3',
      entry_type: '3.1',
      entry_date_time: 'hello',
      entry_by_user_name: 'one',
      entry_by_user_category: 'yes',
    },
    {
      entry_description: '4',
      entry_type: '4.1',
      entry_date_time: 'hello',
      entry_by_user_name: 'two',
      entry_by_user_category: 'yes',
    },
    {
      entry_description: '4',
      entry_type: '4.1',
      entry_date_time: 'hello',
      entry_by_user_name: 'two',
      entry_by_user_category: 'yes',
    },
    {
      entry_description: '3',
      entry_type: '3.1',
      entry_date_time: 'hello',
      entry_by_user_name: 'one',
      entry_by_user_category: 'yes',
    },
    {
      entry_description: '4',
      entry_type: '4.1',
      entry_date_time: 'hello',
      entry_by_user_name: 'two',
      entry_by_user_category: 'yes',
    },
    {
      entry_description: '4',
      entry_type: '4.1',
      entry_date_time: 'hello',
      entry_by_user_name: 'two',
      entry_by_user_category: 'yes',
    },
    {
      entry_description: '3',
      entry_type: '3.1',
      entry_date_time: 'hello',
      entry_by_user_name: 'one',
      entry_by_user_category: 'yes',
    },
    {
      entry_description: '4',
      entry_type: '4.1',
      entry_date_time: 'hello',
      entry_by_user_name: 'two',
      entry_by_user_category: 'yes',
    },
    {
      entry_description: '4',
      entry_type: '4.1',
      entry_date_time: 'hello',
      entry_by_user_name: 'two',
      entry_by_user_category: 'yes',
    },
    {
      entry_description: '3',
      entry_type: '3.1',
      entry_date_time: 'hello',
      entry_by_user_name: 'one',
      entry_by_user_category: 'yes',
    },
    {
      entry_description: '4',
      entry_type: '4.1',
      entry_date_time: 'hello',
      entry_by_user_name: 'two',
      entry_by_user_category: 'yes',
    },
    {
      entry_description: '4',
      entry_type: '4.1',
      entry_date_time: 'hello',
      entry_by_user_name: 'two',
      entry_by_user_category: 'yes',
    },
    {
      entry_description: '3',
      entry_type: '3.1',
      entry_date_time: 'hello',
      entry_by_user_name: 'one',
      entry_by_user_category: 'yes',
    },
    {
      entry_description: '4',
      entry_type: '4.1',
      entry_date_time: 'hello',
      entry_by_user_name: 'two',
      entry_by_user_category: 'yes',
    },
    {
      entry_description: '4',
      entry_type: '4.1',
      entry_date_time: 'hello',
      entry_by_user_name: 'two',
      entry_by_user_category: 'yes',
    },
    {
      entry_description: '3',
      entry_type: '3.1',
      entry_date_time: 'hello',
      entry_by_user_name: 'one',
      entry_by_user_category: 'yes',
    },
    {
      entry_description: '4',
      entry_type: '4.1',
      entry_date_time: 'hello',
      entry_by_user_name: 'two',
      entry_by_user_category: 'yes',
    },
    {
      entry_description: '4',
      entry_type: '4.1',
      entry_date_time: 'hello',
      entry_by_user_name: 'two',
      entry_by_user_category: 'yes',
    },
    {
      entry_description: '3',
      entry_type: '3.1',
      entry_date_time: 'hello',
      entry_by_user_name: 'one',
      entry_by_user_category: 'yes',
    },
    {
      entry_description: '4',
      entry_type: '4.1',
      entry_date_time: 'hello',
      entry_by_user_name: 'two',
      entry_by_user_category: 'yes',
    },
    
  ];

  dataSource: any = new MatTableDataSource<any>(this.ELEMENT_DATA);

  constructor(  private _headerTitle: HeaderTitleService){

  }
  ngOnInit() {
    this._headerTitle.setTitle('Audit Trail');
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.translateMatPaginator(this.paginator);
  }

  translateMatPaginator(paginator: MatPaginator) {
    paginator._intl.firstPageLabel = 'First';
    paginator._intl.itemsPerPageLabel = 'Records Per Page';
    paginator._intl.lastPageLabel = 'Last';
    paginator._intl.nextPageLabel = 'Next';
    paginator._intl.previousPageLabel = 'Previous';
  }

  highlight(element: any) {
    element.highlighted = !element.highlighted;
    this.selection.toggle(element);
    // row.highlighted = !row.highlighted
  }

  filterValue = '';
  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.filterValue = this.filterValue.trim(); // Remove whitespace
    this.filterValue = this.filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = this.filterValue;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  getPageSizes(): number[] {
    if (this.dataSource.data.length > 20) {
      return [5, 10, 20, this.dataSource.data.length];
    }
    else {
     return [5, 10, 20];
    }
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row: any) => this.selection.select(row));
  }

  onRowClicked(row: any) {
    // this.value.emit(row);
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
        'mat-paginator {' +
        'display:none' +
        '}' +
        '#export_btn{' +
        'display:none' +
        '}' +
        '#hint{' +
        'display:none}' +
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

