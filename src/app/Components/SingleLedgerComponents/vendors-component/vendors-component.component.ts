import {
  SelectionModel
} from '@angular/cdk/collections';
import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import {
  MatTableDataSource
} from '@angular/material/table';
import {
  MatPaginator
} from '@angular/material/paginator';
import {
  BusinessService
} from '../../../services/business-service/business.service';
import {
  HelperService
} from '../../../services/helper-service/helper.service';
import { SwitchCompanyService } from 'src/app/services/switch-company-service/switch-company.service';
export interface PeriodicElement {
  Number: string;
  Date: string;
  DueDate: string;
  Vendor: string;
  Total: string;
  Balance: string;
  Status: any;
  Action: string;
  position: number;
}
@Component({
  selector: 'app-vendors-component',
  templateUrl: './vendors-component.component.html',
  styleUrls: ['./vendors-component.component.less']
})
export class VendorsComponentComponent implements OnInit, OnDestroy {
  title = 'Vendors';
  displayedColumns: string[] = ['select',
                                'CustomerName',
                                'ContactEmail',
                                'RegisterDate',
                                'Organizaton',
                                'Status',
                                'BlockChainID',
                                'Invite',
                                'star'];
  selection = new SelectionModel < PeriodicElement > (true, []);

  public dataSource: MatTableDataSource < PeriodicElement > ;
  selected = ['Active'];
  status = [{
      value: 'Invite',
      viewValue: 'Invite'
    },
    {
      value: 'Resend Mail',
      viewValue: 'Resend Mail'
    }
  ];
  StatusList = ['Invite', 'Resend Mail'];
  vendors: any;
  @ViewChild(MatPaginator, {}) paginator: MatPaginator;
  Totalrec: any;
  switchCompanySubscription: any;
  constructor(public businessService: BusinessService, private helper: HelperService, private switchCompany: SwitchCompanyService) {
    this.switchCompanySubscription = this.switchCompany.companySwitched.subscribe(
      () => {
        this.ngOnInit();
      }
    );
  }
  ngOnInit() {
    this.getAllvendors();
  }
  getAllvendors() {
    const companyid = Number(this.helper.getcompanyId());
    this.businessService.getAllVendors(companyid).subscribe(res => {
      console.log(res);
      this.Totalrec = res.length;
      if (res.length > 0) {
        this.vendors = res;
        this.handlePage({
          pageSize: '10',
          pageIndex: '0',
          data: this.vendors
        });
        // this.isBusinessLoaded=true;
      } else {
        // this.companylist=[];
      }
    });
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    if (this.dataSource && this.dataSource.data.length > 0) {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      const numRowsMinusExcluded = this.dataSource.data
        .filter(row => row.Status !== 'Active')
        .length;
      return numSelected === numRowsMinusExcluded;
    }
    return null;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle(status: any) {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => {
        if (row.Status !== 'Active') {
          this.selection.select(row);
        }
      });
    if (status) {
      this.selection.clear();
      this.dataSource.data.forEach(row => {
        if (row.Status !== 'Active' && row.Status == 'Inactive') {
          this.selection.select(row);
        }
      });
    }
  }
  /** The label for the checkbox on the passed row */
  checkboxLabel(row ?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
  Paginator(items, page, per_page) {

    var page = page || 1,
      per_page = per_page || 10,
      offset = (page - 1) * per_page,
      paginatedItems = items.slice(offset).slice(0, per_page),
      total_pages = Math.ceil(items.length / per_page);

    return {
      page: page,
      per_page: per_page,
      pre_page: page - 1 ? page - 1 : null,
      next_page: (total_pages > page) ? page + 1 : null,
      total: items.length,
      total_pages: total_pages,
      data: paginatedItems
    };
  }
  public handlePage(e: any) {
    const pagesize = e.pageSize;
    const pagenumber = e.pageIndex + 1;
    const data = this.Paginator(this.vendors, pagenumber, pagesize);
    this.dataSource = new MatTableDataSource < PeriodicElement > (data.data);
  }
  public checkStatus(status) {
    this.masterToggle(status);
  }
  ngOnDestroy() {
    if (this.switchCompanySubscription) {
      this.switchCompanySubscription.unsubscribe();
    }
  }

}
