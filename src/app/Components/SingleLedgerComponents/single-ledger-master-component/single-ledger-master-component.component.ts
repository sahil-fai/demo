import {
  Component,
  OnInit
} from '@angular/core';
import {
  HelperService
} from '../../../services/helper-service/helper.service';
import {
  BusinessService
} from '../../../services/business-service/business.service';

@Component({
  selector: 'app-single-ledger-master-component',
  templateUrl: './single-ledger-master-component.component.html',
  styleUrls: ['./single-ledger-master-component.component.less']
})
export class SingleLedgerMasterComponentComponent implements OnInit {
  CurrentCompanyName: any;
  public isNavOpen = false;
  businessList: any;

  constructor(private helper: HelperService, public BusinessService: BusinessService) {}

  ngOnInit() {
    const companyid = Number(this.helper.getcompanyId());
    const userId = Number(this.helper.getuserId());
    this.BusinessService.getCompanyInformation(companyid).subscribe(res => {
      this.CurrentCompanyName = res.legalname;
    });
    this.BusinessService.getListOfbusinesses(userId).subscribe(res => {
      console.log(res);
      this.businessList = res;
    });
  }
  public closeNav() {
    this.isNavOpen = !this.isNavOpen;
  }
  public openNav() {
    this.isNavOpen = !this.isNavOpen;
  }
  // public viewBusiness(businessID) {
  //   this.BusinessService.view(businessID).subscribe(res => {
  //     let token = localStorage.getItem('business_token');
  //    // this.helper.business.remove();
  //     //this.helper.business.set(res);
  //     localStorage.setItem('business_token', token);
  //   //  this.setCurrency();
  //     this._switchCompany.switchCompany();

  //   });
  //   this.isModal = false;
  //   setTimeout(() => {
  //     this.isModal = true;
  //   }, 500);
  // }

}
