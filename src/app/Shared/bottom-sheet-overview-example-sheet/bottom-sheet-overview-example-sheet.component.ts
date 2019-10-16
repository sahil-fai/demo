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
// import {
//   ShortStringService
// } from '../app/services/short-service/shortstring.service';

@Component({
  selector: 'app-bottom-sheet-overview-example-sheet',
  templateUrl: './bottom-sheet-overview-example-sheet.component.html',
  styleUrls: ['./bottom-sheet-overview-example-sheet.component.less']
})
export class BottomSheetOverviewExampleSheetComponent implements OnInit {
  invoiceNumeber: any;
  CompanyBlockChainId: any;
  trasactions: any;

  constructor(@Inject(MAT_DIALOG_DATA) public trasaction: any ) {

  }
  ngOnInit(): void {
    console.log(this.trasaction);
    this.trasactions = this.trasaction.blockchainhistories;
    console.log(this.trasactions);
    // this.invoiceNumeber = this.trasaction[1];
    // this.CompanyBlockChainId = this.trasaction[2];
  }
  // close() {
  //   this.bottomSheetRef.dismiss();
  // }
}
