import { Component, OnInit } from '@angular/core';
import { BusinessService } from '../../../services/business-service/business.service';

@Component({
  selector: 'app-dashboard-componet',
  templateUrl: './dashboard-componet.component.html',
  styleUrls: ['./dashboard-componet.component.less']
})
export class DashboardComponetComponent implements OnInit {
  public title = 'DashBoard';
  public value = '';
  constructor(public businessService: BusinessService) { }
  ngOnInit() {
  }

  private getCustomers() {
    this.businessService.getAllCustomers().subscribe(
      res => {
        this.value = JSON.stringify(res);
      }
      , err => {
      });
  }

  private getVendors() {
    this.businessService.getAllVendors().subscribe(
      res => {
        this.value = JSON.stringify(res);
      }
      , err => {
      });
  }

  private getBills() {
    this.businessService.getAllBills().subscribe(
      res => {
        this.value = JSON.stringify(res);
      }
      , err => {
      });
  }

  private getinvoices() {
    this.businessService.getAllInvoices().subscribe(
      res => {
        this.value = JSON.stringify(res);
      }
      , err => {
      });
  }

  private getCompanyInformation()
  {
    this.businessService.getCompanyInformation().subscribe(
      res => {
        this.value = JSON.stringify(res);
      }
      , err => {
      });
  }
}
