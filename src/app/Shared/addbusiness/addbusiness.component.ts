import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addbusiness',
  templateUrl: './addbusiness.component.html',
  styleUrls: ['./addbusiness.component.less']
})
export class AddbusinessComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
public gotoaddtobusiness(){
  this.router.navigate(['/connectbusiness']);
}
}
