import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BusinessService } from '../../../services/business-service/business.service';
import { HelperService } from 'src/app/services/helper-service/helper.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class SuppliersComponent implements OnInit {
  public title =  'My Suppliers';
  formTransaction: FormGroup;
  public COA = [
    {Name: 'COA-1', ID: 1},
    {Name: 'COA-2', ID: 2},
    {Name: 'COA-3', ID: 3},
  ];
  public mapping = [
    {Name: 'VendorBase', ID: 113},
    {Name: 'SubjectBase', ID: 114},
    {Name: 'ItemBase', ID: 116},
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
  public opration = [
    {Name: 'AND', ID: 274},
    {Name: 'OR', ID: 275}
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


  private _createForm() {
    this.formTransaction = this._fb.group({
      Contact: [],
      Platform: [],
      Mapping: [],
      Email:  '',
      IsActive:  false,
      Desc1: '',
      Desc2: '',
      Desc3: '',
      COA: [],
      Operation: [],
      Subject: ''
    });
  }

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

  constructor(private helper: HelperService,
              private businessService: BusinessService, private _fb: FormBuilder,
    ) {
      }

  ngOnInit() {
   this._getChartofAccounts();
   this._getplatforms();
   this._getVendors();
   this._createForm();
  }

  _getVendors() {
    const companyid = Number(this.helper.getcompanyId());
    this.businessService.getAllVendors(companyid).subscribe(res => {
      if (res.length > 0) {
        this.Vendor = res;
       }
    });
  }

  _getplatforms() {
    this.businessService.getPlatforms().subscribe(res => {
      this.platfrom = res;
     });
  }

  _getChartofAccounts() {
    const companyid = Number(this.helper.getcompanyId());
    this.businessService.getCompanyChartOfAccounts(companyid).subscribe(res => {
      this.COA = res;
     });
  }

  public addRecord() {
    if (!this.transcationList[this.transcationList.length - 1].editable) {
      this.transcationList.push(this.transcationListModel);
    }
  }

  public saveRecord(){
    const formData = this.formTransaction.value;
    const data = {
      vendorid: formData.Contact.vendorid,
      chartofaccountmappingtypeidl: formData.Mapping.ID,
      emailonthebill: formData.Email,
      chartofaccountid: formData.COA.chartofaccountid,
      organization: formData.Platform.name,
      isactive: formData.IsActive,
      itemdescription1: formData.Desc1,
      itemdescription2: formData.Desc2,
      itemdescription3: formData.Desc3,
      operationtypeidl: formData.Operation.ID,
      subject: formData.Subject
    };

    this.businessService.postchartofaccountmapping(data).subscribe((res) => {
      console.log(res);
    });

  }

  public cancelRecord(){

  }

}
