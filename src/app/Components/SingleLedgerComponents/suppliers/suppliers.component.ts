import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { BusinessService } from '../../../services/business-service/business.service';
import { HelperService } from 'src/app/services/helper-service/helper.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SwitchCompanyService } from 'src/app/services/switch-company-service/switch-company.service';


@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class SuppliersComponent implements OnInit {
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
  vendor = [];
  COA = [];
  filteredCOA = [];
  CoaItem = [];
  platfrom = [];
  public mapping = [
    { Name: 'VendorBase', ID: 270 },
    { Name: 'SubjectBase', ID: 271 },
    { Name: 'ItemBase', ID: 272 },
  ];
  SubAccount = [];
  opration = [];
  offset: number = 0;
  filter: string = "";
  limit: number = 1000;
  public title = 'My Suppliers';
  formTransaction: FormGroup;
  public transcationList = [];
  public COAMappings: any;
  public isCOAEnabled = true;
  switchCompanySubscription: any;


  constructor(private helper: HelperService, private businessService: BusinessService, private fb: FormBuilder,
    private switchCompany: SwitchCompanyService) {
    this.switchCompanySubscription = this.switchCompany.companySwitched.subscribe( () => {
        this.transcationList = [];
        this.COAMappings = [];
        this.ngOnInit();
      }
    );
  }

  ngOnInit() {
    this.transcationList.length = 0;
    this.transcationList = [];
    this._getChartofAccountMappings();
    this._getplatforms();
    this._getVendors();
    this._getChartofAccounts();
    this._createForm();
    this.addRecord();
  }

  private _createForm() {
    this.formTransaction = this.fb.group({
      Contact: [],
      Platform: [],
      Mapping: [],
      Email: '',
      IsActive: false,
      Desc1: '',
      Desc2: '',
      Desc3: '',
      COA: [],
      Operation: [],
      Subject: ''
    });
  }

  _getChartofAccountMappings() {
    const companyid = Number(this.helper.getcompanyId());
    this.businessService.getchartofaccountmapping(companyid).subscribe(res => { 
      if (res.length > 0) {
        this.COAMappings = res;
        this._generateCOAMapping();
      }
    });
  }

  _generateCOAMapping() {
    this.transcationList.length = 0;
    this.addRecord();
    this.COAMappings.forEach(element => {
      const data = {
        displayName: element.vendor.displayName,
        vendorName: element.vendor.companyName,
        vendorEmail: element.emailonthebill,
        platfrom: element.organization,
        mappingtype: this._getMappingByID(element.chartofaccountmappingtypeidl),
        COA: element.chartofaccount.chartofaccountname,
        ItemOfSubAccount: 'SubAccount-1',
        Subject: element.subject,
        editable: false,
        isActive: element.isactive,
        itemDescription1: element.itemdescription1,
        itemDescription2: element.itemdescription2,
        itemDescription3: element.itemdescription3,
        opration: 274
      };
      this.transcationList.push(data); console.log('transaction: ', data);
    });
    //this._getChartofAccounts();
  }

  _getOperationTypeByID(operationtypeidl: any) {
    return this.opration.find(x => x.ID === operationtypeidl);
  }
  _getMappingByID(chartofaccountmappingtypeidl: any) {
    return this.mapping.find(x => x.ID === chartofaccountmappingtypeidl);
  }

  _getVendors() {
    const companyid = Number(this.helper.getcompanyId());
    this.businessService.getAllVendors(companyid, this.offset, this.filter, this.limit).subscribe(res => {
      if (res[0].length === 0) { this.isCOAEnabled = false; }
      if (res[0].length > 0) {
        this.vendor = res[0];
      }
    });
  }

  _getplatforms() {
    this.businessService.getPlatforms().subscribe(res => {
      if (res.length === 0) { this.isCOAEnabled = false; }
      this.platfrom = res;
    });
  }

  _getChartofAccounts() {
    const companyid = Number(this.helper.getcompanyId());
    this.businessService.getCompanyChartOfAccounts(companyid).subscribe(res => { 
      if (res.length === 0) { 
        this.isCOAEnabled = false; 
      }
      this.COA = res
      this.filteredCOA = [...this.COA];
    });

  }

  removeCOA(index) {
    try {
      if (index) {
        this.COA;
        this.filteredCOA.length = 0;
        this.filteredCOA = []
        this.filteredCOA = [...this.COA];
        var vendors = this.transcationList.filter(x => x.displayName == index.displayName);
        if (vendors && vendors.length > 0) {
          vendors.forEach(vendor => {
            let cOAName = vendor.COA;
            var indexOf = this.filteredCOA.findIndex(x => x.chartofaccountname == cOAName);
            if (indexOf > -1) {
              this.filteredCOA.splice(indexOf, 1);
            }
          });
          this.filteredCOA = [...this.filteredCOA];
        }
      }
    } catch (error) {
      alert(JSON.stringify(error));
    }
  }
  public deleteCOAMapping(coaMappingId){ console.log('coa id:', coaMappingId);
    const companyId = Number(this.helper.getcompanyId());
    this.businessService.deleteCoaMapping(companyId,coaMappingId).subscribe((res) => { console.log('delete res: ', res);
      this._getChartofAccountMappings();
      this.formTransaction.patchValue({ Contact: null, Platform: null, Mapping: null, COA: null });
    });
  }

  public addRecord() {
    if (this.transcationList.length > 0 && !this.transcationList[this.transcationList.length - 1].editable) {
      this.transcationList.push(this.transcationListModel);
    }
    if (this.transcationList.length === 0) {
      this.transcationList.push(this.transcationListModel);
    }
  }

  public saveRecord() {
    const Companyid = Number(this.helper.getcompanyId());
    const formData = this.formTransaction.value;
    const data = {
      vendorid: formData.Contact.id,
      chartofaccountmappingtypeidl: formData.Mapping.ID,
      emailonthebill: formData.Email,
      chartofaccountid: formData.COA.chartofaccountid,
      organization: formData.Platform.name,
      isactive: formData.IsActive,
      itemdescription1: formData.Desc1,
      itemdescription2: formData.Desc2,
      itemdescription3: formData.Desc3,
      operationtypeidl: 274,
      subject: formData.Subject,
      companyid: Companyid
    };
    if (this.COAMappings) {
      const vendor = this.COAMappings.filter(x =>
        (x.vendorid === formData.Contact.vendorid) &&
        (x.organization === formData.Platform.name) &&
        (x.chartofaccountmappingtypeidl === formData.Mapping.ID) &&
        (x.chartofaccountId === formData.COA.chartofaccountid)
      );
      if (vendor && vendor.length > 0) {
        alert('Chart of account mapping already exists for same Vendor\n Maximum one mapping per Vendor');
        return;
      }

    }
    this.businessService.postchartofaccountmapping(data).subscribe((res) => {
      this._getChartofAccountMappings();
      this.formTransaction.patchValue({ Contact: null, Platform: null, Mapping: null, COA: null });
    });
  }
  public cancelRecord() {
    if (this.transcationList) {
      this.transcationList.splice(this.transcationList.length - 1, 1);
    }
  }
  public editRecord(item) {
    //   item.editable = true;
    //   this.formTransaction.controls["Contact"].setValue(item.vendorName);
  }
}
