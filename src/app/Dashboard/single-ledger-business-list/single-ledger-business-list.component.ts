import { Component, OnInit } from '@angular/core';
import { BusinessService } from '../../services/business-service/business.service';
import { HelperService } from '../../services/helper-service/helper.service';
import { Router } from '@angular/router';
import { SwitchCompanyService } from '../../services/switch-company-service/switch-company.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IBusinessModel } from '../../Interface/business/business-model.interface';

@Component({
  selector: 'app-single-ledger-business-list',
  templateUrl: './single-ledger-business-list.component.html',
  styleUrls: ['./single-ledger-business-list.component.less']
})
export class SingleLedgerBusinessListComponent implements OnInit {

  title = 'Business(s) List';
  totalRec: number;
  public companylist: IBusinessModel[];
  public businessListActual: IBusinessModel[] = [];
  public isBusinessLoaded: boolean = false;
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
  switchCompanySubscription: any;
  submitted: boolean;
  formSearch: FormGroup;
  userid 
  constructor(public businessService: BusinessService, private helper: HelperService, private router: Router, private switchCompany: SwitchCompanyService, private _fb: FormBuilder) {
    this.switchCompanySubscription = this.switchCompany.companySwitched.subscribe(() => {
      this.ngOnInit();
    });
  }

  ngOnInit() {
    this.userid = Number(this.helper.getuserId());
    this.getListOfbusinesses(this.userid);
    this._createForm();
  }

  private _createForm() {
    this.formSearch = this._fb.group({ keywords: ['', [Validators.required]] });
  }

  public viewBusiness(companyid) {
    this.helper.setcompanyId(companyid);
    this.router.navigate(['/business', 'company-info']);
  }

  getListOfbusinesses(userid){
    if(userid) {
      this.businessService.getListOfbusinesses(userid).subscribe(res => {
        if (res && res[0].length > 0) {
          this.companylist = res[0];
          this.businessListActual = res;
          this.totalRec = this.companylist.length;
          this.isBusinessLoaded = true;
       
        } else {
          this.companylist = [];
          this.totalRec = 0;
          this.isBusinessLoaded = false;
        }
      });
  }
  }

  public async disconnectBusiness(companyid, status){
    await this.businessService.connetDisconnect(companyid, status).subscribe(res =>{
    });
    this.getListOfbusinesses(this.userid);
  }

  public openDialog() { }

  public onFilter() {
    this.submitted = true;
    if (this.formSearch.invalid) { return; }
    this.companylist = [];
    this.businessListActual.forEach(i => {
      if (i['legalName'].toLocaleLowerCase().indexOf(this.formSearch.controls['keywords'].value.toLocaleLowerCase()) !== -1) {
        this.companylist = [i];
      }
    });
  }

  public onReset() {
    this.pageNumber = 0;
    this.isBusinessLoaded = true;
    this.companylist = this.businessListActual;
    this.formSearch.reset();
    this.submitted = false;
  }

  get f() { return this.formSearch.controls; }
}
