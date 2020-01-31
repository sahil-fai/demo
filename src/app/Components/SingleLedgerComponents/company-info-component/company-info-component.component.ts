import { Component, OnInit, OnDestroy } from '@angular/core';
import { HelperService } from '../../../services/helper-service/helper.service';
import { BusinessService } from '../../../services/business-service/business.service'
import { SwitchCompanyService } from 'src/app/services/switch-company-service/switch-company.service';

@Component({
  selector: 'app-company-info-component',
  templateUrl: './company-info-component.component.html',
  styleUrls: ['./company-info-component.component.less']
})
export class CompanyInfoComponentComponent implements OnInit , OnDestroy {
  title = 'Company Info';
  companyinfo: any;
  switchCompanySubscription: any;
  constructor(private helper: HelperService, public businessService: BusinessService, private switchCompany: SwitchCompanyService) {
    this.switchCompanySubscription = this.switchCompany.companySwitched.subscribe(
      (res) => {
        //console.log(res)
        this.ngOnInit();
      }
    );
  }

  ngOnInit() {
    const companyid = Number(this.helper.getcompanyId());
    const filter = '?filter={"include":[{"relation":"all"}]}';
    this.businessService.getCompanyInformation(companyid, filter).subscribe(res => {
      let compinfo = this.helper.convertJsonKeysToLower(res); 
      if(compinfo && compinfo.currency[0]) {
          localStorage.setItem('CompanyCurrency', compinfo.currency[0].currencyname || 'N/A');
      }
      this.companyinfo = compinfo;
      this.helper.setplatformId(compinfo.platformid);
    });
  }
  ngOnDestroy() {
    if (this.switchCompanySubscription) {
      this.switchCompanySubscription.unsubscribe();
    }
  }

}
