import { Component, OnInit } from '@angular/core';
import { HelperService } from '../../../services/helper-service/helper.service';
import { BusinessService } from '../../../services/business-service/business.service'

@Component({
  selector: 'app-single-ledger-master-component',
  templateUrl: './single-ledger-master-component.component.html',
  styleUrls: ['./single-ledger-master-component.component.less']
})
export class SingleLedgerMasterComponentComponent implements OnInit {
  CurrentCompanyName: any;

  constructor(private helper: HelperService,public BusinessService:BusinessService) { }

  ngOnInit() {
    const companyid=Number(this.helper.getcompanyId());
    this.BusinessService.getCompanyInformation(companyid).subscribe(res => {
    this.CurrentCompanyName= res.LegalName;
    console.log(this.CurrentCompanyName)
   });
  }
  
}
