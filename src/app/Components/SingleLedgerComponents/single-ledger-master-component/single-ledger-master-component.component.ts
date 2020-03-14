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
import { SwitchCompanyService } from 'src/app/services/switch-company-service/switch-company.service';

@Component({
  selector: 'app-single-ledger-master-component',
  templateUrl: './single-ledger-master-component.component.html',
  styleUrls: ['./single-ledger-master-component.component.less']
})
export class SingleLedgerMasterComponentComponent implements OnInit {
  CurrentCompanyName: any;
  public isNavOpen = false;
  businessList: any;
  businessListMapping: any;
  isModal: boolean;
  pageLimit : number = 10;
  offset: number = 0;
  filter :string = "";
 textmap:boolean;
  constructor(private helper: HelperService, public businessService: BusinessService, private switchCompany: SwitchCompanyService) {}

  ngOnInit() {
    const companyid = Number(this.helper.getcompanyId());
    const userId = Number(this.helper.getuserId());
    this.businessService.getCompanyInformation(companyid).subscribe(res => {
      this.CurrentCompanyName = res.name;
      this.textmap=JSON.parse(this.helper.getTaxMapping());
    });
    this.businessService.getListOfbusinesses(userId, this.offset, this.filter, this.pageLimit).subscribe(res => {
      //this.businessList = res[0];
      this.businessListMapping =res[0];
      // this.helper.setTaxMapping(res.isTaxMapped);
      this.appendNewElement();
      this.sortBusinessList(companyid);
    });
  }

  appendNewElement(){
    this.businessListMapping.forEach(element => {
      element.isSelected = 1
    });
    console.log(this.businessListMapping);
  }

  public closeNav() {
    this.isNavOpen = !this.isNavOpen;
  }
  public openNav() {
    this.isNavOpen = !this.isNavOpen;
  }
  public viewBusiness(businessID) {
    let companyid = this.helper.getcompanyId();
    if (companyid === String(businessID))
    {
        return;
    }
    this.helper.setcompanyId(businessID);
    this.switchCompany.switchCompany();
    this.ngOnInit();
  }
  ngDoCheck(){
    console.log("hiiii");
    this.textmap=JSON.parse(this.helper.getTaxMapping());
  }

  sortBusinessList(businessID){
    this.businessListMapping.forEach(element => {
      if(element.id == businessID){
        element.isSelected = 0
      }
    });

    this.businessList = this.businessListMapping.sort(function(a, b) { return a.isSelected - b.isSelected; })
    var selectedBusiness = this.businessList.filter( x=> x.isSelected == 0)
    this.helper.setSelectedBusinessName(selectedBusiness[0].legalName);
  }
}
