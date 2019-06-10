import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-info-component',
  templateUrl: './company-info-component.component.html',
  styleUrls: ['./company-info-component.component.less']
})
export class CompanyInfoComponentComponent implements OnInit {
  title="Company Info";
  constructor() { }

  ngOnInit() {
  }

}
