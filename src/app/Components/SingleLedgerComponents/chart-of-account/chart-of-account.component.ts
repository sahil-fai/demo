import {
  SelectionModel
} from '@angular/cdk/collections';
import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy
} from '@angular/core';
import {
  MatTableDataSource
} from '@angular/material/table';
import {
  MatPaginator
} from '@angular/material/paginator';
import {
  BusinessService
} from '../../../services/business-service/business.service';
import {
  HelperService
} from '../../../services/helper-service/helper.service';
import { SwitchCompanyService } from '../../../services/switch-company-service/switch-company.service';

@Component({
  selector: 'app-chart-of-account',
  templateUrl: './chart-of-account.component.html',
  styleUrls: ['./chart-of-account.component.less']
})
export class ChartOfAccountComponent implements OnInit, OnDestroy {
  Totalrec: any;
  switchCompanySubscription: any;
  public COA: any;
  optionsMap: any;
public title=  'Chart Of Account';
  constructor(public businessService: BusinessService, private helper: HelperService, private switchCompany: SwitchCompanyService) {
    this.switchCompanySubscription = this.switchCompany.companySwitched.subscribe(
      () => {
        this.ngOnInit();
      }
    );
  }

  ngOnInit() {
    const companyid = Number(this.helper.getcompanyId());
    this.getAllChartOfAccount(companyid);
  }
  getAllChartOfAccount(companyid) {
     this.businessService.getGroupChartofAccounts(companyid).subscribe(res => {
      this.COA = res;
    });
  }
  updateCheckedOptions(id, event) {
    this.setAsDefault(event, id);
    this.businessService.setAsDefault(id).subscribe((res) => {
       //console.log(res);
    });
  }
  setAsDefault(event, option) {
    this.COA.Expense.forEach((item) => {
      if (item.chartofaccountid == option) {
        item.isdefault = true;
      } else {
        item.isdefault = false;
      }
    });
  }
  ngOnDestroy() {
    if (this.switchCompanySubscription) {
      this.switchCompanySubscription.unsubscribe();
    }
  }

}
