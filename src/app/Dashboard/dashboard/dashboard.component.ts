import { Component, OnInit } from '@angular/core';
import { QuickBookConnectService } from '../../services/quickbook-service/quick-book-connect.service'
import { BusinessReloadComponent } from '../../Shared/business-reload/business-reload.component';
import { MatDialogRef } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  public _reloadingDialog: MatDialogRef<BusinessReloadComponent>;
  constructor(public quickbookconnect:QuickBookConnectService, public dialog: MatDialog, private router: Router) { }

  ngOnInit() {
  }

  public onConnect() {
    const _self = this;
    var LeftPosition = (screen.width) ? (screen.width-600)/2 : 0;
    var TopPosition = (screen.height) ? (screen.height-700)/2 : 0;
    var settings ='height='+700+',width='+600+',top='+TopPosition+',left='+LeftPosition+',scrollbars='+scroll+',resizable';
    const windowObjectReference = window.open("","qb_window",settings);
    this.quickbookconnect.connect().subscribe(
      res => {
        const path = res['url'];
        windowObjectReference.location.href = path;
        windowObjectReference.focus();
        const message = function receiveMessage(event) {
          let data;
          if (true) {
            data = JSON.parse(event["data"]);
            _self.reloadBusiness();
            if (true) {
              window.removeEventListener("message", message, false);
            }
          }
        };
        window.addEventListener("message", message, false);
       // this.reloadBusiness();
        // For IE browser
        const myTimer = setInterval(function () {
          if (windowObjectReference.closed) {
            clearInterval(myTimer);
            const ua = window.navigator.userAgent;
            const is_ie = /MSIE|Trident/.test(ua);
            if (is_ie) {
            }
          }
        }, 100);
      }, err => {
        windowObjectReference.close();
      });
  }

  public reloadBusiness() {
    const _self = this;
    this._reloadingDialog = this.dialog.open(BusinessReloadComponent, {
      width: '450px',
      disableClose: true,
      position: {
        top: '80px'
      }
    });
    setTimeout(() => {
      _self._reloadingDialog.close();
      this.router.navigate(['/businesslist']);
    }, 20000);
    //_self._toastr.info(Messages.businessDataReload, '', _self._helper.reloadBiusinessToastConfiguration());
    // this._bussinessService.reload(businessID).subscribe(res => {
    //   //_self._helper.clearToastMessages();
    //   _self._reloadingDialog.close();
    //   _self.viewBusiness(businessID);
    // }, err => {
    //   if (err.error && err.error.Code && err.error.Code === 1012)
    //   {
    //   var result = this.businessListActual.find(obj => {
    //     return obj.ID === businessID
    //   })
    //   result.TokensExpiredBit = true;
    // }
    //   _self._reloadingDialog.close();
    // });
  }
}
