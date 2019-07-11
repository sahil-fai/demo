import { Component, OnInit } from '@angular/core';
import { BusinessService } from '../../../services/business-service/business.service';
import { UserprofileService } from '../../../services/user-service/userprofile.service';

@Component({
  selector: 'app-dashboard-componet',
  templateUrl: './dashboard-componet.component.html',
  styleUrls: ['./dashboard-componet.component.less']
})
export class DashboardComponetComponent implements OnInit {
  public title = 'DashBoard';
  public value = '';
  constructor(public businessService: BusinessService,
              public userService: UserprofileService) { }
  ngOnInit() {
  }

  public getCustomers() {
    this.businessService.getAllCustomers(215).subscribe(
      res => {
        this.value = JSON.stringify(res);
      }
      , err => {
      });
  }

  public getVendors() {
    this.businessService.getAllVendors(178).subscribe(
      res => {
        this.value = JSON.stringify(res);
      }
      , err => {
      });
  }

  public getBills() {
    this.businessService.getAllBills().subscribe(
      res => {
        this.value = JSON.stringify(res);
      }
      , err => {
      });
  }

  public getinvoices() {
    this.businessService.getAllInvoices().subscribe(
      res => {
        this.value = JSON.stringify(res);
      }
      , err => {
      });
  }

  // public getCompanyInformation()
  // {
  //   this.businessService.getCompanyInformation().subscribe(
  //     res => {
  //       this.value = JSON.stringify(res);
  //     }
  //     , err => {
  //     });
  // }
  public getCompanies()
  {
    this.businessService.getListOfbusinesses(28).subscribe(
      res => {
        this.value = JSON.stringify(res);
      }
      , err => {
      });
  }

  public getUserProfileInformation()
  {
    this.userService.getUserProfile().subscribe(
      (res) => {
        this.value = JSON.stringify(res);
      },
      (err)=>{

      }
    )
  }


}
