import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';

@Component({
  selector: 'app-bottom-sheet-overview-example-sheet',
  templateUrl: './bottom-sheet-overview-example-sheet.component.html',
  styleUrls: ['./bottom-sheet-overview-example-sheet.component.less']
})
export class BottomSheetOverviewExampleSheetComponent implements OnInit {
  ngOnInit(): void {
  
  }
  constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheetComponent>) {}

}
