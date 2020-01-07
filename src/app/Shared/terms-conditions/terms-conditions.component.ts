import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.less']
})
export class TermsConditionsComponent implements OnInit {
  didAccept= false;
  
  constructor(private dialogRef: MatDialogRef<TermsConditionsComponent>,
    @Inject(MAT_DIALOG_DATA) data) { }

  ngOnInit() {}
 
  accept(agreed: boolean) {
    this.didAccept = agreed;
    this.dialogRef.close(this.didAccept);
  }
  
}
