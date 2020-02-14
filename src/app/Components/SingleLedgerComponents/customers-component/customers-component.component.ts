import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { BusinessService } from '../../../services/business-service/business.service';
import { HelperService } from '../../../services/helper-service/helper.service';
import { SwitchCompanyService } from 'src/app/services/switch-company-service/switch-company.service';
import { ErrorHandlerService } from 'src/app/services/error-handler-service/error-handler.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, FormBuilder, Validators, } from '@angular/forms';

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
  selector: 'app-customers-component',
  templateUrl: './customers-component.component.html',
  styleUrls: ['./customers-component.component.less']
})

export class CustomersComponentComponent implements OnInit, OnDestroy {
  public dataSource: MatTableDataSource<PeriodicElement>;
  title = 'Customers';
  selected = ['Active'];
  status = [{
    value: 'Active',
    viewValue: 'Active'
  },
  {
    value: 'Inactive',
    viewValue: 'Inactive'
  }
  ];
  StatusList = ['Invite', 'Resend Mail'];
  customers: any;
  Totalrec: any;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  switchCompanySubscription: any;
  displayedColumns: string[] = ['select', 'CustomerName', 'ContactEmail', 'RegisterDate', 'Organizaton', 'Status', 'Invite',
 // 'star'
];
  selection = new SelectionModel<PeriodicElement>(true, []);
  platformid: number;
  formFilter: FormGroup;
  private name : FormControl;
  public submitted: boolean;

  constructor(private _fb : FormBuilder,
    public businessService: BusinessService, private helper: HelperService, private switchCompany: SwitchCompanyService, private _errHandler: ErrorHandlerService, private _toastr: ToastrService) {
    this.switchCompanySubscription = this.switchCompany.companySwitched.subscribe(() => {
        this.ngOnInit();
      }
    );
  }
  ngOnInit() {
    this.name = new FormControl("", [ Validators.required, Validators.minLength(1) ])
    this.formFilter = this._fb.group({
      name :this.name
    });

    const companyid = Number(this.helper.getcompanyId());
    this.platformid = this.helper.getplatformId();
    this.getAllCustomer(companyid);
  }

  filterCustomer(){
    this.submitted = true;
    console.log(this.name.value);
    this.getAllCustomer(Number(this.helper.getcompanyId()), this.name.value);
  }

  onReset(){
    this.formFilter.reset();
    this.getAllCustomer(Number(this.helper.getcompanyId()));
  }

  getAllCustomer(companyid, filter = "") {
    this.businessService.getAllCustomers(companyid, filter).subscribe(res => {
      this.Totalrec = res.length;
      this.customers =  res;
      if (res.length > 0) {
        let response = this.helper.convertJsonKeysToLower(res)
        this.customers =  response;
        // this.handlePage({
        //   pageSize: '1000',
        //   pageIndex: '0'
        // });
        this.dataSource = new MatTableDataSource<PeriodicElement>(this.customers);
      }
    });
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    if (this.dataSource && this.dataSource.data.length > 0) {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }
    return null;
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
  //     per_page = per_page || 10,
  //     offset = (page - 1) * per_page,
  //     paginatedItems = items.slice(offset).slice(0, per_page),
  //     total_pages = Math.ceil(items.length / per_page);
  //   return {
  //     page: page,
  //     per_page: per_page,
  //     pre_page: page - 1 ? page - 1 : null,
  //     next_page: (total_pages > page) ? page + 1 : null,
  //     total: items.length,
  //     total_pages: total_pages,
  //     data: paginatedItems
  //   };
  // }

  // public handlePage(e: any) {
  //   //console.log(e)
  //   let pagesize = e.pageSize;
  //   let pagenumber = e.pageIndex + 1;
  //   let data = this.Paginator(this.customers, pagenumber, pagesize);
  //   this.dataSource = new MatTableDataSource<PeriodicElement>(this.customers); console.log('datasource: ', this.dataSource);
  // }

  postInvite(item: any) {
    if (item.email) {
      const userid = Number(this.helper.getuserId());
      const compid = Number(this.helper.getcompanyId());
      const email = item.email;
      const companyContactId = item.id;
      // const data = {
      //   userid: userid,
      //   businessid: compid,
      //   email: email,
      //   ccId: companyContactId
      // };
      const data = {
        userId: userid,
        businessid: compid,
        requestType: 2,
        ccId: companyContactId,
        contactType:1,
        email: email
       }

      this.businessService.postInvite(data).subscribe((res) => {
        // console.log("email sent: ");
        if(res) {
          if(res.invite_count == 1) {
           this.getAllCustomer(compid);
          }
          this._toastr.success(res.message);
        }
      }, (err) => {
        // console.log("email failed")
      })
    } else {
      this._errHandler.pushError('Sorry email is empty');
    }
  }

  ngOnDestroy() {
    if (this.switchCompanySubscription) {
      this.switchCompanySubscription.unsubscribe();
    }
  }

}
