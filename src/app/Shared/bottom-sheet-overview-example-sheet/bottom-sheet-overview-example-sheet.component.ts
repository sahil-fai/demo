import {
  Component,
  OnInit,
  Inject
} from '@angular/core';
import {
  MatBottomSheetRef,
} from '@angular/material';
import {
  MAT_BOTTOM_SHEET_DATA
} from '@angular/material';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogConfig,
  MatDialog
} from '@angular/material/dialog';
@Component({
  selector: 'app-bottom-sheet-overview-example-sheet',
  templateUrl: './bottom-sheet-overview-example-sheet.component.html',
  styleUrls: ['./bottom-sheet-overview-example-sheet.component.less']
})
export class BottomSheetOverviewExampleSheetComponent implements OnInit {
  invoiceNumeber: any;
  CompanyBlockChainId: any;
  trasactions: any;

  constructor(@Inject(MAT_DIALOG_DATA) public trasaction: any) {

  }
  ngOnInit(): void {
    const data = [
      {
        invoiceid: 1553,
        organization: '120',
        userid: 320,
        department: '',
        issuedate: '2019-10-11T00:00:00.000Z',
        duedate: '2019-10-11T00:00:00.000Z',
        note: '',
        customerid: 2742,
        currencyexchangerateid: 1426,
        totaldiscount: 0,
        total: 100000,
        taxid: 9406,
        paymentid: null,
        invoicehashcode: '',
        companyblockchainid: '',
        suggestedchartofaccountid: null,
        hasadjusted: '0',
        creditadjustmentsid: null,
        islatepayments: '0',
        paymentrecievedid: null,
        companyid: 20973,
        deposit: 0,
        invoicebalance: null,
        createtime: null,
        lastupdatedtime: null,
        invoicenumber: '150',
        invoicetypeidl: null,
        hascustomeattribute: true,
        thirdpartyinvoiceid: null,
        vendorchartofaccountid: null,
        customerchartofaccountid: null,
        billingcompanyid: null,
        blockchainstatusidl: null,
        invoicestatusidl: {
          transactionstatusid: 1,
          platformidl: 120,
          blockchainstatusidl: 148,
          cloudaccountingstatusname: 'Created',
          isdeleted: null,
          transactiontype: 140,
          isactive: true,
          createdat: null,
          updatedat: null,
          deletedat: null
        },
        blockchainhistories: [
          {
            blockchainhistoryid: 610,
            entitytypeidl: 140,
            historyactiontypeidl: 148,
            description: 'Tx-21215346946464646',
            entityid: 1553,
            blocknumber: null,
            timestamp: null,
            chaincodename: null,
            channelname: null
          },
          {
            blockchainhistoryid: 611,
            entitytypeidl: 140,
            historyactiontypeidl: 149,
            description: 'TX-14526333366',
            entityid: 1553,
            blocknumber: null,
            timestamp: null,
            chaincodename: null,
            channelname: null
          },
          {
            blockchainhistoryid: 612,
            entitytypeidl: 140,
            historyactiontypeidl: 266,
            description: 'TX-121215345464646',
            entityid: 1553,
            blocknumber: null,
            timestamp: null,
            chaincodename: null,
            channelname: null
          }
        ]
      }
    ];
    this.trasactions = data[0].blockchainhistories;
    console.log(this.trasactions);
    this.invoiceNumeber = this.trasaction[1];
    this.CompanyBlockChainId = this.trasaction[2];
  }
  // close() {
  //   this.bottomSheetRef.dismiss();
  // }
}
