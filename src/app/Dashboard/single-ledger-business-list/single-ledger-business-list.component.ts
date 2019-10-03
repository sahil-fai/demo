import {
  Component,
  OnInit
} from '@angular/core';
import {
  BusinessService
} from '../../services/business-service/business.service';
import {
  from
} from 'rxjs';
import {
  HelperService
} from '../../services/helper-service/helper.service';
import {
  Router
} from '@angular/router';
import {
  SwitchCompanyService
} from '../../services/switch-company-service/switch-company.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-single-ledger-business-list',
  templateUrl: './single-ledger-business-list.component.html',
  styleUrls: ['./single-ledger-business-list.component.less']
})
export class SingleLedgerBusinessListComponent implements OnInit {
  title = 'Business(s) List';
  companylist: Array < any > ;
  totalRec: number;
  page = 1;
  length: number;
  public isBusinessLoaded: boolean;
  public maxSize = 7;
  public directionLinks = true;
  public autoHide = true;
  public responsive = true;
  public selectedValue = 5;
  public labels: any = {
    previousLabel: 'Prev',
    nextLabel: 'Next',
    screenReaderPaginationLabel: 'Pagination',
    screenReaderPageLabel: 'page',
    screenReaderCurrentLabel: `You're on page`
  };

  public config = {
    itemsPerPage: this.selectedValue,
    currentPage: 1,
    totalItems: this.totalRec,
    id: 'companylist'
  };

  public pageNumber = 1;
  public pageSizeOptions: number[] = [5, 15, 25];
  public numberOfpages: number[];
  businesslsist: any;
  switchCompanySubscription: any;
  submitted: boolean;
  businessListFiltered: any;
  actualBusinessList: any[];
  constructor(public businessService: BusinessService,
              private helper: HelperService, private router: Router,
              private switchCompany: SwitchCompanyService,
              private _fb: FormBuilder) {
    this.switchCompanySubscription = this.switchCompany.companySwitched.subscribe(
      () => {
        this.ngOnInit();
      }
    );
  }
  formSearch: FormGroup;
  ngOnInit() {
    const userrid = Number(this.helper.getuserId());
    this._createForm();
    this.businessService.getListOfbusinesses(userrid).subscribe(res => {
      if (res.length >= 0) {
        this.companylist = this.businessListFiltered = res;
        this.actualBusinessList =  res;
        this.totalRec = this.companylist.length;
        this.isBusinessLoaded = true;
      } else {
        this.companylist = [];
      }
    });
  }
  private _createForm() {
    this.formSearch = this._fb.group({
      keywords: ['', [Validators.required]]
    });
  }
  public viewBusiness(companyid) {
    this.helper.setcompanyId(companyid);
    this.router.navigate(['/business', 'company-info']);
  }
  public openDialog(){}
  public onFilter() {
    this.submitted = true;
    if (this.formSearch.invalid) { return; }
    this.businessListFiltered = [];
    this.actualBusinessList =  this.companylist;
    this.companylist.forEach(i => {
      if (i.company.legalname.toLocaleLowerCase().indexOf(this.formSearch.controls.keywords.value.toLocaleLowerCase()) !== -1) {
        this.businessListFiltered.push(i);
      }
    });
    this.companylist = this.businessListFiltered;
  }
  public onReset() {
    this.pageNumber = 0;
    this.companylist = this.actualBusinessList;
    this.formSearch.reset();
    this.submitted = false;
  }
  get f() { return this.formSearch.controls; }
}
