import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BusinessService } from '../../../services/business-service/business.service';
import { HelperService } from 'src/app/services/helper-service/helper.service';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class SuppliersComponent implements OnInit {
  public title =  'My Suppliers';
  public COA = [
    {Name: 'COA-1', ID: 1},
    {Name: 'COA-2', ID: 2},
    {Name: 'COA-3', ID: 3},
  ];
  public mapping = [
    {Name: 'Context Mapping', ID: 1},
    {Name: 'Subject Mapping', ID: 2}
  ];
  public platfrom = [
    {Name: 'Platfrom-1', ID: 1},
    {Name: 'Platfrom-2', ID: 2},
    {Name: 'Platfrom-3', ID: 3},
  ];
  public Vendor = [
    {Name: 'Vendor-1', ID: 1},
    {Name: 'Vendor-2', ID: 2},
    {Name: 'Vendor-3', ID: 3},
  ];
  public SubAccount = [
    {Name: 'SubAccount-1', ID: 1},
    {Name: 'SubAccount-2', ID: 2},
    {Name: 'SubAccount-3', ID: 3},
  ];
  public itemDescription1 = [
    {Name: 'itemDescription-1', ID: 1},
    {Name: 'itemDescription-2', ID: 2},
    {Name: 'itemDescription-3', ID: 3},
  ];
  public itemDescription2 = [
    {Name: 'itemDescription-1', ID: 1},
    {Name: 'itemDescription-2', ID: 2},
    {Name: 'itemDescription-3', ID: 3},
  ];
  public itemDescription3 = [
    {Name: 'itemDescription-1', ID: 1},
    {Name: 'itemDescription-2', ID: 2},
    {Name: 'itemDescription-3', ID: 3},
  ];
  public opration = [
    {Name: 'AND', ID: 1},
    {Name: 'OR', ID: 2}
  ];
  public transcationList = [{
    vendorName: 'Vendor1',
    vendorEmail: 'Vendor@mail.com',
    platfrom: 'QuickBook',
    mappingtype: 'map-1',
    COA: 'COA-1',
    ItemOfSubAccount: 'SubAccount-1',
    Subject: 'Subject-1',
    editable: false,
    isActive: true,
    itemDescription1: 'desk',
    itemDescription2: 'portal',
    itemDescription3: 'adjustable',
    opration: 'AND'

  },
  {
    vendorName: 'Vendor2',
    vendorEmail: 'Vendor@mail.com',
    platfrom: 'QuickBook',
    mappingtype: 'map-2',
    COA: 'COA-2',
    ItemOfSubAccount: 'SubAccount-2',
    Subject: 'Subject-2',
    editable: false,
    isActive: true,
    itemDescription1: 'desk',
    itemDescription2: 'portal',
    itemDescription3: 'adjustable',
    opration: 'OR'
  }];
  public transcationListModel = {
    vendorName: '',
    vendorEmail: '',
    platfrom: '',
    mappingtype: '',
    COA: '',
    ItemOfSubAccount: '',
    Subject: '',
    editable: true,
    isActive: true,
    itemDescription1: '',
    itemDescription2: '',
    itemDescription3: '',
    opration: 'AND'
  };
  vendors: any;
  constructor(private helper: HelperService,
              private businessService: BusinessService
    ) {
      }

  ngOnInit() {
   this._getChartofAccounts();
   this._getplatforms();
   this._getVendors();
  }

  _getVendors() {
    const companyid = Number(this.helper.getcompanyId());
    this.businessService.getAllVendors(companyid).subscribe(res => {
      if (res.length > 0) {
        this.vendors = res;
       }
    });
  }


  _getplatforms() {
    this.businessService.getPlatforms().subscribe(res => {
      console.log(res);
     });
  }

  _getChartofAccounts() {
    const companyid = Number(this.helper.getcompanyId());
    this.businessService.getCompanyChartOfAccounts(companyid).subscribe(res => {
      console.log(res);
     });
  }

  public addRecord() {
    if (!this.transcationList[this.transcationList.length - 1].editable) {
      this.transcationList.push(this.transcationListModel);
    }
  }

  public saveRecord(){

  }

  public cancelRecord(){

  }

}
