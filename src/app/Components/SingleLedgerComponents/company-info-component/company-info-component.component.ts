import { Component, OnInit } from '@angular/core';
import { HelperService } from '../../../services/helper-service/helper.service';
import { BusinessService } from '../../../services/business-service/business.service'

@Component({
  selector: 'app-company-info-component',
  templateUrl: './company-info-component.component.html',
  styleUrls: ['./company-info-component.component.less']
})
export class CompanyInfoComponentComponent implements OnInit {
  title="Company Info";
  companyinfo: any;
  constructor(private helper: HelperService,public BusinessService:BusinessService) { }

  ngOnInit() {
    const companyid=Number(this.helper.getcompanyId());
    this.BusinessService.getCompanyInformation(companyid).subscribe(res => {
      console.log(res)
      this.companyinfo= res;
    });
  }

}
