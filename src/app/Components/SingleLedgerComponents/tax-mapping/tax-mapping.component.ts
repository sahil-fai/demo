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
  mastertax : any = [];
  othertax :any =[];
  companytax = [];
  singleLedgerTax = [];
  public mastertaxMappings: any;
  public othertaxMappings: any;
  public taxratesforcompanyMappings: any;
  public singleLedgerTaxRecord  : any =[];
  public taxRecord  : any =[];
  public otherTaxRecord : any =[];
  public companyTaxRecord  = [];
  public taxMapping : any =[];
  selectedMasterTaxID;
  selectedCompanyTaxID;
  
  companyies = 'Single Ledger Tax 1'

  constructor(public businessService: BusinessService, private helper: HelperService) { 

  }

  ngOnInit() {
    this.getTaxes();
  }
 
  getTaxes(){
    const companyid = Number(this.helper.getcompanyId());
    this.businessService.getTaxes(companyid).subscribe(res => {
      this.mastertaxMappings =  res.mastertax;
      this.othertaxMappings = res.otherstax;
      this.taxratesforcompanyMappings = res.taxratesforthecompany;
      debugger
      this.taxMapping = res.taxmapping;
      this.filterTaxMappingData();
      debugger
      var abc = this.taxRecord;
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
      this.singleLedgerTax=[...this.singleLedgerTax, mastertaxData];
    // .push();
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
      this.singleLedgerTax=[...this.singleLedgerTax, othertaxData];
      //this.singleLedgerTax.push(othertaxData);
    });
  }

  filterTaxMappingData(){
    this.generateMastertaxMapping();
    this.generateOthertaxMapping();
    this.fillTaxaMappingData();
    debugger
    if(this.taxRecord){
    this.taxRecord.forEach(element => {
      debugger
      this.singleLedgerTax = this.singleLedgerTax.filter( x => x.id !== element.SingleLedgerTaxList[0].id);
      this.taxratesforcompanyMappings = this.taxratesforcompanyMappings.filter( x => x.id !== element.CompanyTaxList[0].id);
     });
    }
  }

  fillTaxaMappingData(){
    debugger
    if(this.taxMapping){
    this.taxMapping.forEach(element => {
      const taxMappingData = {
        id : 0,
        SingleLedgerTaxList: [],
        CompanyTaxList: [],
      }
      let singleLedgerData = this.singleLedgerTax.filter( x => x.id === element.master_tax_rate_id)
      let companyData = this.taxratesforcompanyMappings.filter( x => x.id === element.company_tax_component_id)
      taxMappingData.id = element.id;
      taxMappingData.SingleLedgerTaxList = singleLedgerData;
      taxMappingData.CompanyTaxList =  companyData;
      debugger
      if(this.taxRecord.length  == 0  || this.taxRecord[0].id !== element.id){
      this.taxRecord.push(taxMappingData);
      }
      //this.addrecords(element.id, singleLedgerData[0], companyData[0]);
    });
  }
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

  getMasterTaxValues(event){
    this.selectedMasterTaxID = event.id;
  }

  getCompanyTaxValues(event){
    this.selectedCompanyTaxID = event.id;
  }

  addMapping(){
    if(this.selectedCompanyTaxID && this.selectedMasterTaxID)
    {
      debugger
      let singleLedgerValues = this.singleLedgerTax.filter( x => x.id === this.selectedMasterTaxID)
      let companyValues = this.taxratesforcompanyMappings.filter( x => x.id === this.selectedCompanyTaxID)
      
      if(singleLedgerValues && companyValues){
        //let id = Math.random().toString(10).substr(2, 4);
        //this.addrecords(0, singleLedgerData[0], companyData[0]);
        const taxRecordData = {
          SingleLedgerTaxList: [],
          CompanyTaxList: [],
        }
        debugger
  
        taxRecordData.SingleLedgerTaxList = singleLedgerValues[0];
        taxRecordData.CompanyTaxList =  companyValues[0];
       // this.taxRecord.push(taxRecordData);
        //this.taxRecord = [...this.taxRecord, this.taxRecordData];
        console.log(this.taxRecord);

        //Save Mapping
        this.saveTaxMapping(singleLedgerValues[0].id, companyValues[0].id);
      }
    }
   }

  // addrecords(id = 0, singleLedgerTaxListValues, companyTaxListvalues){
  //   const taxRecordData = {
  //     id : 0,
  //     SingleLedgerTaxList: [],
  //     CompanyTaxList: [],
  //   }
  //   debugger
  //   taxRecordData.id = id;
  //   taxRecordData.SingleLedgerTaxList = singleLedgerTaxListValues;
  //   taxRecordData.CompanyTaxList =  companyTaxListvalues;
  //   this.taxRecord.push(taxRecordData);
  // }
  

  deleteTaxMapping(id){
    debugger
    //this.taxRecord.forEach(element => {
     if (id) {
        debugger
        // Delete recorde from server
        this.businessService.deleteTaxMapping(id).subscribe(res =>
          {
            debugger
            let list = this.taxRecord.filter( x=> x.id == id)
            // this.singleLedgerTax = [...this.singleLedgerTax, list[0].SingleLedgerTaxList];
            // this.taxratesforcompanyMappings = [...this.taxratesforcompanyMappings, list[0].CompanyTaxList];
            this.taxRecord.splice(this.taxRecord.indexOf(list), 1);
            this.getTaxes();
            console.log("Record Deleted");
        });
      }
    //});
  }

  saveTaxMapping(masterTaxRateId, companyTaxRateId){
    debugger
    let companyID = Number(localStorage.getItem('CompanyId'));
    let masterTaxId = masterTaxRateId;
    let companyTaxId = companyTaxRateId;
    const saveMappingData = {
      companyid:companyID,
      taxmapping:{
        CompanyId:companyID,
        MasterTaxRateId: masterTaxId,
        CompanyTaxRateId: companyTaxId,
        PlateFormTaxCode:""
      }};
     
     this.businessService.taxRateMapping(saveMappingData).subscribe(res => {
       debugger
      this.getTaxes();
      // this.singleLedgerTax = this.singleLedgerTax.filter( x => x.id !== this.selectedMasterTaxID);
       //this.taxratesforcompanyMappings = this.taxratesforcompanyMappings.filter( x => x.id !== this.selectedCompanyTaxID);
       console.log("submitted" + res);
      });
  }
}