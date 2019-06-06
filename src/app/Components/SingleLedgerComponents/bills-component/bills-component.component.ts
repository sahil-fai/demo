import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bills-component',
  templateUrl: './bills-component.component.html',
  styleUrls: ['./bills-component.component.less']
})
export class BillsComponentComponent implements OnInit {
  title="Bills";
  constructor() { }

  ngOnInit() {
  }

}
