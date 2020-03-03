import { Component, OnInit } from '@angular/core';
import { BusinessService } from 'src/app/services/business-service/business.service';
import { HelperService } from 'src/app/services/helper-service/helper.service';
import { SwitchCompanyService } from 'src/app/services/switch-company-service/switch-company.service';

@Component({
  selector: 'app-tax-mapping',
  templateUrl: './tax-mapping.component.html',
  styleUrls: ['./tax-mapping.component.less']
})
export class TaxMappingComponent implements OnInit {

  singleLedger 
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
  switchCompanySubscription: any;
  
  taxRatesforCompany;

  constructor(public businessService: BusinessService, private helper: HelperService, private switchCompany: SwitchCompanyService) { 
    this.switchCompanySubscription = this.switchCompany.companySwitched.subscribe(
      () => {
        this.ngOnInit();
      }
    );
  }

  ngOnInit() {
    this.getTaxes();
    this.taxRecord.length = 0;
    this.taxRecord= []; 
  }
 
  getTaxes(){
    const companyid = Number(this.helper.getcompanyId());
    this.businessService.getTaxes(companyid).subscribe(res => {
      this.mastertaxMappings =  res.mastertax;
      this.othertaxMappings = res.otherstax;
      this.taxratesforcompanyMappings = res.taxratesforthecompany;
      this.taxMapping = res.taxmapping;
      this.filterTaxMappingData();
   }
   );
  }

  generateMastertaxMapping(){
   this.mastertax.length = 0;
    this.mastertaxMappings.forEach(element => {
      const mastertaxData = {
        id : element.id,
        Name: element.Name+ '-'+ element.TaxPercentage + '%, ' + element.ProvinceFullName,
        ProvinceFullName: element.ProvinceFullName,
        ProvinceShortName: element.ProvinceShortName,
        Country: element.Country,
        Status: element.Status,
        TaxPercentage : element.TaxPercentage ,
        title : 'Recommended Tax'
      }
      this.singleLedgerTax=[...this.singleLedgerTax, mastertaxData];
    });
  }
  
  generateOthertaxMapping(){

    this.othertax.length = 0;
    this.othertaxMappings.forEach(element => {
      const othertaxData = {
        id : element.id,
        Name: element.Name+ '-'+ element.TaxPercentage + '%, ' + element.ProvinceFullName,
        ProvinceFullName: element.ProvinceFullName,
        ProvinceShortName: element.ProvinceShortName,
        Country: element.Country,
        TaxPercentage : element.TaxPercentage,
        Status: element.Status,
        title : 'Other Tax'
      }
      this.singleLedgerTax=[...this.singleLedgerTax, othertaxData];
    });
  }

  generateTaxRatesforCompanyMapping(){
    this.companytax.length = 0;
    this.taxratesforcompanyMappings.forEach(element => {
      const taxratesforcompanyData = {
        id : element.id,
        Name: element.Name + '-'+ element.Rate + '%',
        Rate: element.Rate,
        IsCompund: element.IsCompund,
        Isrecoverable: element.Isrecoverable,
        paltform_owner_id: element.paltform_owner_id,
        TaxRateId: element.TaxRateId,
        CompanyId: element.CompanyId
      }
      this.companytax=[...this.companytax, taxratesforcompanyData];
    });
  }

  filterTaxMappingData(){
    this.singleLedgerTax.length = 0;
    this.singleLedgerTax=[];
    this.generateMastertaxMapping();
    this.generateOthertaxMapping();
    this.generateTaxRatesforCompanyMapping();
    this.fillTaxaMappingData();
    if(this.taxRecord){
    this.taxRecord.forEach(element => {
      this.singleLedgerTax = this.singleLedgerTax.filter( x => x.id !== element.SingleLedgerTaxList[0].id);
      this.companytax = this.companytax.filter( x => x.id !== element.CompanyTaxList[0].id);
     });
    }
  }

  fillTaxaMappingData(){
    if(this.taxMapping){
    this.taxMapping.forEach(element => {
      const taxMappingData = {
        id : 0,
        SingleLedgerTaxList: [],
        CompanyTaxList: [],
      }
      let singleLedgerData = this.singleLedgerTax.filter( x => x.id === element.master_tax_rate_id)
      let companyData = this.companytax.filter( x => x.id === element.company_tax_component_id)
      taxMappingData.id = element.id;
      taxMappingData.SingleLedgerTaxList = singleLedgerData;
      taxMappingData.CompanyTaxList =  companyData;
      let isRecordNotMatched = this.taxRecord.filter( x => x.id === element.id).length == 0;

      // if(this.taxRecord.length  == 0){
      // this.taxRecord.push(taxMappingData);
      // }
      if(isRecordNotMatched){
        this.taxRecord.push(taxMappingData);
      }
    });
  }
  }

  addMapping()
  {
    if(this.taxRatesforCompany && this.singleLedger)
    {
      let singleLedgerValues = this.singleLedgerTax.filter( x => x.id === this.singleLedger)
      let companyValues = this.companytax.filter( x => x.id === this.taxRatesforCompany)
      
      if(singleLedgerValues && companyValues){
        this.saveTaxMapping(singleLedgerValues[0].id, companyValues[0].id);
        this.taxRatesforCompany= null;
        this.singleLedger= null;
      }
    }
   }

  deleteTaxMapping(id){
     if (id) {
        // Delete recorde from server
        this.businessService.deleteTaxMapping(Number(localStorage.getItem('CompanyId')), id).subscribe(res =>
          {
            let list = this.taxRecord.filter( x=> x.id == id)
            this.taxRecord.splice(this.taxRecord.indexOf(list), 1);
            this.getTaxes();
            console.log("Record Deleted");
        });
      }
  }

  saveTaxMapping(masterTaxRateId, companyTaxRateId){
    let companyID = Number(localStorage.getItem('CompanyId'));
    let masterTaxId = masterTaxRateId;
    let companyTaxId = companyTaxRateId;
    const saveMappingData = {
      companyid:companyID,
      taxmapping:{
        CompanyId:companyID,
        MasterTaxRateId: masterTaxId,
        CompanyTaxComponentId: companyTaxId,
        PlateFormTaxCode:""
      }};
     
     this.businessService.taxRateMapping(saveMappingData).subscribe(res => {
        this.getTaxes();
        console.log("submitted");
      });
  }
}