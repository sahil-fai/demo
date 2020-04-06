import { Component } from '@angular/core'
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper-service/helper.service';

@Component({
  template: `
   <div id="main">
    	<div class="fof">
            <h1>Error 404</h1>
            <br/>
            <br/>
             <p><a href="#"><h3>Go Back</h3></a> </p>
    	</div>
     
</div>

  `,
  styles: [`*{
    transition: all 0.6s;
}

html {
    height: 100%;
}

body{
    font-family: 'Lato', sans-serif;
    color: #888;
    margin: 0;
}

#main{
    display: table;
    width: 100%;
    height: 100vh;
    text-align: center;
}

.fof{
	  display: table-cell;
	  vertical-align: middle;
}

.fof h1{
	  font-size: 50px;
	  display: inline-block;
	  padding-right: 12px;
	  animation: type .5s alternate infinite;
}

@keyframes type{
	  from{box-shadow: inset -3px 0px 0px #888;}
	  to{box-shadow: inset -3px 0px 0px transparent;}
}`]
})
export class Error404Component {
  constructor(private _router: Router, private _helper: HelperService) { }
  // ngOnInit() {
  //   try {
  //     var token = this._helper.getToken();
  //     if (token) {
  //     } else {
  //       this._router.navigate(['/login'])

  //     }
  //   } catch (error) {
  //     this._router.navigate(['/login'])
  //     //return true
  //   }
  // }
}