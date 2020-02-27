import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';

export interface DialogData {
  disconectCompanyID: any,
  disconectCompanyStatus: any,
  currentUserid: any
  }


@Component({
  selector: 'json-editor-modal',
  templateUrl: './json-editor-modal.component.html',
})
export class JsonEditorModalComponent implements OnInit {

    @ViewChild(JsonEditorComponent, { static: true }) editor: JsonEditorComponent;
    options: JsonEditorOptions;
   // jsonData: any;
   // 
    jsonData = {
      products: [{
        name: 'car',
        product: [{
          name: 'ddddddd',
          model: [
            { id: 'civic', name: 'civic' },
            { id: 'accord', name: 'accord' },
            { id: 'crv', name: 'crv' },
            { id: 'pilot', name: 'pilot' },
            { id: 'odyssey', name: 'odyssey' }
          ]
        }]
      }]
    };

    constructor(
        
        public dialogRef: MatDialogRef<JsonEditorModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) {
            this.options = new JsonEditorOptions();
            this.options.mode = 'text';
            console.log(this.jsonData);
        }


    ngOnInit(){
    }
    onNoClick(): void {
      this.dialogRef.close();
    }

}