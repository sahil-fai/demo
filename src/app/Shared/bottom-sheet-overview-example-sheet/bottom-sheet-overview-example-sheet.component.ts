import {
  Component,
  OnInit,
  Inject
} from '@angular/core';
import {
  MatBottomSheetRef
} from '@angular/material';
import {
  MAT_BOTTOM_SHEET_DATA
} from '@angular/material';

@Component({
  selector: 'app-bottom-sheet-overview-example-sheet',
  templateUrl: './bottom-sheet-overview-example-sheet.component.html',
  styleUrls: ['./bottom-sheet-overview-example-sheet.component.less']
})
export class BottomSheetOverviewExampleSheetComponent implements OnInit {
  invoiceNumeber: any;
  CompanyBlockChainId: any;
  trasactions: any;

  constructor(private bottomSheetRef: MatBottomSheetRef < BottomSheetOverviewExampleSheetComponent >,
              @Inject(MAT_BOTTOM_SHEET_DATA) public trasaction: any) {

  }
  ngOnInit(): void {
   this.trasactions = this.trasaction[0];
   this.invoiceNumeber = this.trasaction[1];
   this.CompanyBlockChainId = this.trasaction[2];
   console.log(this.invoiceNumeber);
  }
  close() {
    this.bottomSheetRef.dismiss();
  }
}
