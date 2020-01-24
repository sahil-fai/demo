import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoaderService } from 'src/app/services/loader-service/loader.service';
// import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.less']
})
export class LoaderComponent implements OnInit, OnDestroy {
  private subscription;
  public showLoader = false;

  constructor(
    private loaderService: LoaderService,
  //  private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    // this.spinner.show();
   // this.showLoader = true;
    this.subscription = this.loaderService.loaderState.subscribe(loader => {
      if (loader > 0) {

        this.showLoader = true;
      } else {
        this.showLoader = false;
      }
      //  if (loader > 0) {
      //     this.spinner.show();
      //   } else {
      //       this.spinner.hide();
      //   }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
