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
  isModal: boolean;

  constructor(private helper: HelperService, public businessService: BusinessService, private switchCompany: SwitchCompanyService) {}

  ngOnInit() {
    const companyid = Number(this.helper.getcompanyId());
    const userId = Number(this.helper.getuserId());
    this.businessService.getCompanyInformation(companyid).subscribe(res => {
      this.CurrentCompanyName = res.name;
    });
    this.businessService.getListOfbusinesses(userId).subscribe(res => {
      this.businessList = res[0];
    });
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
}
