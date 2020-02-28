import { Component, OnInit } from '@angular/core';
import { BusinessService } from 'src/app/services/business-service/business.service';
import { HelperService } from 'src/app/services/helper-service/helper.service';

@Component({
  selector: 'app-tax-mapping',
  templateUrl: './tax-mapping.component.html',
  styleUrls: ['./tax-mapping.component.less']
})
export class TaxMappingComponent implements OnInit {

  singleLedger = 'Single Ledger Tax'
  mastertax = [];
  othertax = [];
  companytax = [];
  singleLedgerTax = [];
  public mastertaxMappings: any;
  public othertaxMappings: any;
  public taxratesforcompanyMappings: any;
  public singleLedgerTaxRecord  = [];
  public otherTaxRecord : any;
  public companyTaxRecord  = [];
  public taxMapping : any;
  selectedMasterTaxID;
  selectedCompanyTaxID;
  
  singletax2 = [
    {
      id: 3,
      Name: "PST",
      ProvinceFullName: "British Columbia",
      ProvinceShortName: "BC",
      Country: "CANADA",
      Status: true,
      title: "Other Tax"
    },
    {
      id: 4,
      Name: "AST",
      ProvinceFullName: "British Columbia",
      ProvinceShortName: "BC",
      Country: "CANADA",
      Status: true,
      title: "Master Tax"
    }];
  //   {
  //     name: 'Single Ledger Tax 5', title: 'Heading 1'
  //   },
  //   {
  //     name: 'Single Ledger Tax 6', title: 'Heading 1'
  //   },
  //   {
  //     name: 'Single Ledger Tax 7', title: 'Heading 1'
  //   },
  //   {
  //     name: 'Single Ledger Tax 8', title: 'Heading 2'
  //   },
  //   {
  //     name: 'Single Ledger Tax 9', title: 'Heading 2'
  //   },
  //   {
  //     name: 'Single Ledger Tax 10', title: 'Heading 2'
  //   },
  //   {
  //     name: 'Single Ledger Tax 11', title: 'Heading 2'
  //   },
  //   {
  //     name: 'Single Ledger Tax 12', title: 'Heading 2'
  //   },
  //   {
  //     name: 'Single Ledger Tax 13', title: 'Heading 2'
  //   },
  //   {
  //     name: 'Single Ledger Tax 14', title: 'Heading 2'
  //   },
  //   {
  //     name: 'Single Ledger Tax 15', title: 'Heading 3'
  //   },
  //   {
  //     name: 'Single Ledger Tax 16', title: 'Heading 3'
  //   },
  //   {
  //     name: 'Single Ledger Tax 17', title: 'Heading 3'
  //   },
  //   {
  //     name: 'Single Ledger Tax 18', title: 'Heading 3'
  //   },
  //   {
  //     name: 'Single Ledger Tax 19', title: 'Heading 3'
  //   },
  //   {
  //     name: 'Single Ledger Tax 20', title: 'Heading 3'
  //   },
  //   {
  //     name: 'Single Ledger Tax 21', title: 'Heading 3'
  //   },
  // ];


  companyies = 'Single Ledger Tax 1'
  companytax1 = [
    {
      Name: 'Company Tax 1', title: 'Heading 1'
    },
    {
      Name: 'Company Tax 6', title: 'Heading 1'
    },
    {
      Name: 'Company Tax 7', title: 'Heading 1'
    },
    {
      Name: 'Company Tax 8', title: 'Heading 2'
    },
    {
      Name: 'Company Tax 9', title: 'Heading 2'
    },
   
  ];
  Res = {
    "taxratesforthecompany": [
      {
        "id": 1059,
        "Name": "Canada Revenue Agency",
        "TaxType": "",
        "DisplayTaxRate": 0,
        "EffectiveTaxRate": 0,
        "Status": false,
        "CanApplyToAssets": false,
        "CanApplyToExpenses": true,
        "CanApplyToLiabilities": false,
        "CanApplyToRevenue": false,
        "platform_owner_id": "1",
        "companyid": 240
      },
      {
        "id": 1060,
        "Name": "Minister of Finance",
        "TaxType": "",
        "DisplayTaxRate": 0,
        "EffectiveTaxRate": 0,
        "Status": false,
        "CanApplyToAssets": false,
        "CanApplyToExpenses": true,
        "CanApplyToLiabilities": false,
        "CanApplyToRevenue": false,
        "platform_owner_id": "2",
        "companyid": 240
      },
      {
        "id": 1061,
        "Name": "California Department of Tax and Fee Administration",
        "TaxType": "",
        "DisplayTaxRate": 17.5,
        "EffectiveTaxRate": 17.5,
        "Status": false,
        "CanApplyToAssets": false,
        "CanApplyToExpenses": false,
        "CanApplyToLiabilities": false,
        "CanApplyToRevenue": false,
        "platform_owner_id": "3",
        "companyid": 240
      },
      {
        "id": 1062,
        "Name": "No Tax Agency",
        "TaxType": "",
        "DisplayTaxRate": 0,
        "EffectiveTaxRate": 0,
        "Status": false,
        "CanApplyToAssets": false,
        "CanApplyToExpenses": true,
        "CanApplyToLiabilities": false,
        "CanApplyToRevenue": false,
        "platform_owner_id": "4",
        "companyid": 240
      }
    ],
    "mastertax": [
      {
        "id": 3,
        "Name": "PSTT",
        "ProvinceFullName": "British Columbia",
        "ProvinceShortName": "BC",
        "Country": "CANADA",
        "TaxPercentage": 7,
        "Status": true
      },
      {
        "id": 4,
        "Name": "GST",
        "ProvinceFullName": "British Columbia",
        "ProvinceShortName": "BC",
        "Country": "CANADA",
        "TaxPercentage": 5,
        "Status": true
      }
    ],
    "otherstax": [
      {
        "id": 1,
        "Name": "GST",
        "ProvinceFullName": "Alberta",
        "ProvinceShortName": "AB",
        "Country": "CANADA",
        "TaxPercentage": 12,
        "Status": true
      },
      {
        "id": 3,
        "Name": "PST",
        "ProvinceFullName": "British Columbia",
        "ProvinceShortName": "BC",
        "Country": "CANADA",
        "TaxPercentage": 7,
        "Status": true
      },
      {
        "id": 4,
        "Name": "GST",
        "ProvinceFullName": "British Columbia",
        "ProvinceShortName": "BC",
        "Country": "CANADA",
        "TaxPercentage": 5,
        "Status": true
      },
      {
        "id": 5,
        "Name": "GST",
        "ProvinceFullName": "Manitoba",
        "ProvinceShortName": "MB",
        "Country": "CANADA",
        "TaxPercentage": 5,
        "Status": true
      },
      {
        "id": 6,
        "Name": "PST",
        "ProvinceFullName": "Manitoba",
        "ProvinceShortName": "MB",
        "Country": "CANADA",
        "TaxPercentage": 7,
        "Status": true
      },
      {
        "id": 7,
        "Name": "HST",
        "ProvinceFullName": "New Brunswick",
        "ProvinceShortName": "NB",
        "Country": "CANADA",
        "TaxPercentage": 15,
        "Status": true
      },
      {
        "id": 8,
        "Name": "HST",
        "ProvinceFullName": "Newfoundland and Labrador",
        "ProvinceShortName": "NL",
        "Country": "CANADA",
        "TaxPercentage": 15,
        "Status": true
      },
      {
        "id": 9,
        "Name": "GST",
        "ProvinceFullName": "Northwest Territories",
        "ProvinceShortName": "NT",
        "Country": "CANADA",
        "TaxPercentage": 5,
        "Status": true
      },
      {
        "id": 10,
        "Name": "HST",
        "ProvinceFullName": "Nova Scotia",
        "ProvinceShortName": "AB",
        "Country": "CANADA",
        "TaxPercentage": 15,
        "Status": true
      },
      {
        "id": 11,
        "Name": "GST",
        "ProvinceFullName": "Nunavut",
        "ProvinceShortName": "NU",
        "Country": "CANADA",
        "TaxPercentage": 5,
        "Status": true
      },
      {
        "id": 12,
        "Name": "HST",
        "ProvinceFullName": "Ontario",
        "ProvinceShortName": "ON",
        "Country": "CANADA",
        "TaxPercentage": 13,
        "Status": true
      },
      {
        "id": 14,
        "Name": "GST",
        "ProvinceFullName": "Quebec",
        "ProvinceShortName": "QC",
        "Country": "CANADA",
        "TaxPercentage": 5,
        "Status": true
      },
      {
        "id": 15,
        "Name": "PST",
        "ProvinceFullName": "Quebec",
        "ProvinceShortName": "QC",
        "Country": "CANADA",
        "TaxPercentage": 10,
        "Status": true
      },
      {
        "id": 16,
        "Name": "GST",
        "ProvinceFullName": "Saskatchewan",
        "ProvinceShortName": "SK",
        "Country": "CANADA",
        "TaxPercentage": 5,
        "Status": true
      },
      {
        "id": 17,
        "Name": "PST",
        "ProvinceFullName": "Saskatchewan",
        "ProvinceShortName": "SK",
        "Country": "CANADA",
        "TaxPercentage": 6,
        "Status": true
      },
      {
        "id": 18,
        "Name": "GST",
        "ProvinceFullName": "Yukon",
        "ProvinceShortName": "YK",
        "Country": "CANADA",
        "TaxPercentage": 5,
        "Status": true
      }
    ]
  };

  constructor(public businessService: BusinessService, private helper: HelperService) { }

  ngOnInit() {
    this.getTaxes();
  }
 
  getTaxes(){
    const companyid = Number(this.helper.getcompanyId());
    this.businessService.getTaxes(companyid).subscribe(res => {
      debugger
      this.mastertaxMappings =  this.Res.mastertax;
      this.othertaxMappings = this.Res.otherstax;
      this.taxratesforcompanyMappings = this.Res.taxratesforthecompany;
        this.generateMastertaxMapping();
        this.generateOthertaxMapping();
      console.log(this.mastertax);
      console.log(this.singletax2);
   }
   );
  }

  generateMastertaxMapping(){
    this.mastertax.length = 0;
    this.mastertaxMappings.forEach(element => {
      const mastertaxData = {
        id : element.id,
        Name: element.Name,
        ProvinceFullName: element.ProvinceFullName,
        ProvinceShortName: element.ProvinceShortName,
        Country: element.Country,
        Status: element.Status,
        title : 'Recommended Tax'
      }
      this.singleLedgerTax.push(mastertaxData);
    });
  }

  generateOthertaxMapping(){
    this.othertax.length = 0;
    this.othertaxMappings.forEach(element => {
      const othertaxData = {
        id : element.id,
        Name: element.Name,
        ProvinceFullName: element.ProvinceFullName,
        ProvinceShortName: element.ProvinceShortName,
        Country: element.Country,
        Status: element.Status,
        title : 'Other Tax'
      }
      this.singleLedgerTax.push(othertaxData);
    });
  }

  // generateTaxRatesforCompanyMapping(){
  //   this.companytax.length = 0;
  //   this.taxratesforcompanyMappings.forEach(element => {
  //     const taxratesforcompanyData = {
  //       id : element.id,
  //       Name: element.Name,
  //       DisplayTaxRate: element.DisplayTaxRate,
  //       EffectiveTaxRate: element.EffectiveTaxRate,
  //       Status: element.Status,
  //       CanApplyToAssets: element.CanApplyToAssets,
  //       CanApplyToExpenses: element.CanApplyToExpenses,
  //       CanApplyToLiabilities: element.CanApplyToLiabilities,
  //       CanApplyToRevenue: element.CanApplyToRevenue,
  //       platform_owner_id: element.platform_owner_id,
  //       companyid: element.platform_owner_id,
  //       title : 'Recommended Tax'
  //     }
  //     this.companytax.push(taxratesforcompanyData);
  //   });
  // }

  getMasterTaxValues(selectedMasterTaxID){
    debugger
    console.log(selectedMasterTaxID.selected);
    this.selectedMasterTaxID = selectedMasterTaxID;
    this.mapTaxValues();
  }

  getCompanyTaxValues(selectedCompanyTaxID){
    console.log(selectedCompanyTaxID.selected);
    this.selectedCompanyTaxID = selectedCompanyTaxID
    this.mapTaxValues();
  }

  mapTaxValues(){
    
  }

  addMapping(){
    debugger
    var a = this.singleLedgerTax;
    var b = this.taxratesforcompanyMappings;
    if(this.selectedCompanyTaxID && this.selectedMasterTaxID){
      let data =this.singleLedgerTax.filter( x => x.id === this.selectedMasterTaxID)
      this.singleLedgerTaxRecord.push(data);
     // this.otherTaxRecord = this.othertax.filter( x => x.id === this.selectedMasterTaxID);
      this.companyTaxRecord.push(this.taxratesforcompanyMappings.filter( x => x.id === this.selectedCompanyTaxID));
      this.singleLedgerTax = this.singleLedgerTax.filter( x => x.id !== this.selectedMasterTaxID);
     // this.othertax = this.othertax.filter( x => x.id !== this.selectedMasterTaxID);
      this.taxratesforcompanyMappings = this.taxratesforcompanyMappings.filter( x => x.id !== this.selectedCompanyTaxID);
      }

      var aa = this.singleLedgerTaxRecord;
  }

  submit(){
    const data = {
    CompanyId:localStorage.getItem('CompanyCurrency'),
    MasterTaxRateId: 1,
    CompanyTaxRateId:14,
    PlateFormTaxCode:""
    };
    if(this.singleLedgerTaxRecord){
      this.singleLedgerTaxRecord.forEach(element => {
        data.MasterTaxRateId = element.id;
    });
    }

    if(this.companyTaxRecord){
      this.companyTaxRecord.forEach(element => {
        data.CompanyTaxRateId = element.id;
    });
  }

}
}
