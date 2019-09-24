import {
  Component,
  OnInit
} from '@angular/core';
import {
  ErrorHandlerService
} from 'src/app/services/error-handler-service/error-handler.service';
import {
  ToastrService
} from 'ngx-toastr';
import {
  Router
} from '@angular/router';
import {
  HelperService
} from 'src/app/services/helper-service/helper.service';

@Component({
  selector: 'app-error-handler',
  templateUrl: './error-handler.component.html',
  styleUrls: ['./error-handler.component.less']
})
export class ErrorHandlerComponent implements OnInit {

  private _subscribeError;

  constructor(private _errHandler: ErrorHandlerService, private _toastr: ToastrService,
    private _router: Router, private _helper: HelperService) {

  }

  ngOnInit() {
    var self = this;
    self._subscribeError = self._errHandler.isCaughtError.subscribe(err => {
      console.log(err);
      self._toastr.error(err || "something went wrong!!")

    });
  }

  ngOnDestroy() {
    this._subscribeError.unsubscribe();
  }

}
