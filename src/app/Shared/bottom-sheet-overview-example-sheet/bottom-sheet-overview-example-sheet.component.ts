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
    this.trasactions = this.trasaction[0];
    this.invoiceNumeber = this.trasaction[1];
    this.CompanyBlockChainId = this.trasaction[2];
  }
  // close() {
  //   this.bottomSheetRef.dismiss();
  // }
}
