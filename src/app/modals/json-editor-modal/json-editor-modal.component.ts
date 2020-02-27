import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { BusinessService } from 'src/app/services/business-service/business.service';

export interface DialogData {
  currentUserID: any
  TransactionID: any,
  }


@Component({
  selector: 'json-editor-modal',
  templateUrl: './json-editor-modal.component.html',
})
export class JsonEditorModalComponent implements OnInit {

    @ViewChild(JsonEditorComponent, { static: true }) editor: JsonEditorComponent;
    options: JsonEditorOptions;
    jsonResponse: any;


    constructor(
      public businessService: BusinessService,
        public dialogRef: MatDialogRef<JsonEditorModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) {
            this.options = new JsonEditorOptions();
            this.options.mode = 'code';
           this.getJsonData();
        }


    ngOnInit(){
    }

    getJsonData(){
      this.businessService.getTransactionById(this.data).subscribe(res =>{
        console.log(res);
        this.jsonResponse = res;
      });
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

}