import { Component, OnInit } from '@angular/core';
import { BusinessService } from '../../services/business-service/business.service'
import { from } from 'rxjs';
import { HelperService } from '../../services/helper-service/helper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-single-ledger-business-list',
  templateUrl: './single-ledger-business-list.component.html',
  styleUrls: ['./single-ledger-business-list.component.less']
})
export class SingleLedgerBusinessListComponent implements OnInit {
  title="Business(s) List";
  companylist: Array<any>;
  totalRec : number;
  page: number = 1;
  length:number;
  public maxSize: number = 7;
  public directionLinks: boolean = true;
  public autoHide: boolean = true;
  public responsive: boolean = true;
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
    id:"companylis"
  };

  public pageNumber = 1;
  public pageSizeOptions: number[] = [5,15,25];
  public numberOfpages: number[];
  businesslsist: any;
  
  constructor(public BusinessService:BusinessService, private helper: HelperService, private router: Router) { 
  }
 
  ngOnInit() {
    const userrid=Number(this.helper.getuserId());
    this.BusinessService.getListOfbusinesses(userrid).subscribe(res => {
      this.companylist= res;
      this.totalRec = this.companylist.length;
    });
  }
  public viewBusiness(companyid){
    this.helper.setcompanyId(companyid);
    this.router.navigate(['/business', 'company-info']);
    console.log(companyid);
  }
}
