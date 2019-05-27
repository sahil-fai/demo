import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.less']
})
export class LoaderComponent implements OnInit {

  private subscription;
  public showLoader: boolean = true;

  constructor(private _loaderService: LoaderService) { }

  ngOnInit() {
    this.subscription = this._loaderService.loaderState.subscribe((loader) => {
      if (loader > 0) {
        this.showLoader = true;

        // To disable all the inputs and buttons till request is under process.
        var inputs = document.getElementsByTagName("Input");
        var buttons = document.getElementsByTagName("Button");
        for (var i = 0; i < inputs.length; i++) {
          if (inputs[i]['type'] === 'submit' || inputs[i]['type'] === 'reset') {
            inputs[i]['disabled'] = true;
          }
        }
        for (var i = 0; i < buttons.length; i++) {
          buttons[i]['disabled'] = true;
        }

      } else {
        this.showLoader = false;

        // To enable all the inputs and buttons enable after request is processed.
        var inputs = document.getElementsByTagName("Input");
        var buttons = document.getElementsByTagName("Button");
        for (var i = 0; i < inputs.length; i++) {
          if (inputs[i]['type'] === 'submit' || inputs[i]['type'] === 'reset') {
            inputs[i]['disabled'] = false;
          }
        }
        for (var i = 0; i < buttons.length; i++) {
          buttons[i]['disabled'] = false;
        }
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

