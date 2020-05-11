import {SelectionModel} from '@angular/cdk/collections';
import {Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import json from './res.json';
import { MatPaginator } from '@angular/material/paginator';
import { BusinessService } from 'src/app/services/business-service/business.service';
import { HelperService } from 'src/app/services/helper-service/helper.service.js';
import { SwitchCompanyService } from 'src/app/services/switch-company-service/switch-company.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
export interface PeriodicElement {
  Number: string;
  Date: string;
  DueDate: string;
  Vendor: string;
  Total: string;
  Balance: string;
  Status: string;
  Action: string;
  position: number;
}

@Component({
  selector: 'app-bills-component',
  templateUrl: './bills-component.component.html',
  styleUrls: ['./bills-component.component.less']
})
export class BillsComponentComponent implements OnInit, OnDestroy {
  title = 'Bills';
  bills: any;
  pagelimit: number = 10;
  public dataSource: MatTableDataSource<PeriodicElement>;
  Totalrec: number;
  pageNumber : number = 0;
  offset : number= 0;
  isFilterSearch : boolean = false;
  isResetSearch: boolean = false;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  displayedColumns: string[] = ['index', 'Number', 'VendorName','Date', 'DueDate', 'Total', 'Balance',
 // 'star'
];
  selection = new SelectionModel<PeriodicElement>(true, []);

  switchCompanySubscription: any;
  platformid: number;
  companyCurrency: string;
  formFilter: FormGroup;
  public vendorName : FormControl
  
  constructor(private _fb : FormBuilder,public businessService: BusinessService, private helper: HelperService, private switchCompany: SwitchCompanyService) {
    this.switchCompanySubscription = this.switchCompany.companySwitched.subscribe(
      () => {
        this.ngOnInit();
      }
    );
  }

  ngOnInit() {
    this.vendorName = new FormControl("", [ Validators.required, Validators.minLength(1) ])
    this.formFilter = this._fb.group({
      vendorName :this.vendorName
    });

      this.getAllBills();
      this.platformid = this.helper.getplatformId();
      if(localStorage.getItem('CompanyCurrency') && localStorage.getItem('CompanyCurrency')!== undefined) {
        this.companyCurrency = localStorage.getItem('CompanyCurrency');
      }
  }
    getAllBills(offset = this.offset, vendorName = "") {
      if(this.isFilterSearch || this.isResetSearch){
        this.Totalrec = 0;
        this.pageNumber = 0;
      }
      const companyid = Number(this.helper.getcompanyId());
      const filter = '?filter={"include":[{"relation":"all"}]}';
      this.businessService.getAllBills(companyid, offset, vendorName, this.pagelimit).subscribe(res => {
        this.bills = res[0];
        this.Totalrec = res[1].totalItems;
        // this.handlePage({pageSize: '10', pageIndex: '0'});
        this.dataSource = new MatTableDataSource<PeriodicElement>(this.bills);
      });
    }


    filterVendor(){
      this.isFilterSearch = true;
      this.getAllBills(this.offset, this.vendorName.value);
    }

    onReset(){
      this.isResetSearch = true;
      this.formFilter.reset();
      this.getAllBills();
    }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  // Paginator(items, page, per_page) {
  //   var page = page || 1,
  //   per_page = per_page || 10,
  //   offset = (page - 1) * per_page,

  //   paginatedItems = items.slice(offset).slice(0, per_page),
  //   total_pages = Math.ceil(items.length / per_page);
  //   return {
  //   page: page,
  //   per_page: per_page,
  //   pre_page: page - 1 ? page - 1 : null,
  //   next_page: (total_pages > page) ? page + 1 : null,
  //   total: items.length,
  //   total_pages: total_pages,
  //   data: paginatedItems
  //   };
  // }

  public handlePage(e: any) {
    this.isFilterSearch = false;
    this.isResetSearch = false;
    let skipNumberOfPages = this.pagelimit * e.pageIndex ;
    this.pageNumber = e.pageIndex * e.pageSize;
    this.getAllBills(skipNumberOfPages);
    //this.dataSource = new MatTableDataSource<PeriodicElement>(this.bills);
  }
  ngOnDestroy() {
    if (this.switchCompanySubscription) {
      this.switchCompanySubscription.unsubscribe();
    }
  }
}
