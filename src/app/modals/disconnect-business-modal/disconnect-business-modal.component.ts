import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
    safeSrc: string
  }

@Component({
  selector: 'disconnect-business-modal',
  templateUrl: './disconnect-business-modal.component.html',
})
export class DisconnectBusinessModalComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<DisconnectBusinessModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) {}


    ngOnInit(){

    }
}