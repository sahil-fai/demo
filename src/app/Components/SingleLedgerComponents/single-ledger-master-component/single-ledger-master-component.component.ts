import { Component, OnInit } from '@angular/core';
import { HelperService } from '../../../services/helper-service/helper.service';
import { BusinessService } from '../../../services/business-service/business.service';

@Component({
  selector: 'app-single-ledger-master-component',
  templateUrl: './single-ledger-master-component.component.html',
  styleUrls: ['./single-ledger-master-component.component.less']
})
export class SingleLedgerMasterComponentComponent implements OnInit {
  CurrentCompanyName: any;
  public isNavOpen = false;

  constructor(private helper: HelperService, public BusinessService: BusinessService) { }

  ngOnInit() {
    const companyid = Number(this.helper.getcompanyId());
    this.BusinessService.getCompanyInformation(companyid).subscribe(res => {
    this.CurrentCompanyName = res.legalname;
   });
  }
  public closeNav() {
    this.isNavOpen = !this.isNavOpen;
  }
  public openNav() {
    this.isNavOpen = !this.isNavOpen;
  }

}

