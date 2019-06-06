import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-componet',
  templateUrl: './dashboard-componet.component.html',
  styleUrls: ['./dashboard-componet.component.less']
})
export class DashboardComponetComponent implements OnInit {
  title="DashBoard";
  constructor() { }

  ngOnInit() {
  }

}
