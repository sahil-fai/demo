import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BusinessService } from 'src/app/services/business-service/business.service';

export interface DialogData {
  disconectCompanyID: any,
  disconectCompanyStatus: any,
  currentUserid: any
  }

@Component({
  selector: 'disconnect-business-modal',
  templateUrl: './disconnect-business-modal.component.html',
})
export class DisconnectBusinessModalComponent implements OnInit {


    constructor(public businessService: BusinessService,
        public dialogRef: MatDialogRef<DisconnectBusinessModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) {}


    ngOnInit(){
    }
    onNoClick(): void {
      this.dialogRef.close();
    }

    diconnectBusiness(): void{
      this.businessService.connetDisconnect(this.data.disconectCompanyID, this.data.disconectCompanyStatus).subscribe(res =>{
          // this.getListOfbusinesses(this.userid);
        });
      this.dialogRef.close();
    }
}