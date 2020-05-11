import { Component, OnInit } from '@angular/core';
import { QuickBookConnectService } from '../../services/quickbook-service/quick-book-connect.service'
import { BusinessReloadComponent } from '../../Shared/business-reload/business-reload.component';
import { MatDialogRef } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { XeroConnectService } from 'src/app/services/xero-connect-service/xero-connect.service';
import { SocketService } from 'src/app/services/socket.service';
import { InvitationModalComponent } from 'src/app/modals/invitation-modal/invitation-modal.component';
import { takeUntil, filter } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  public _reloadingDialog: MatDialogRef<BusinessReloadComponent>;
  public connectedToBusiness:string;
  private unsubscribe$: Subject<void> = new Subject();
  constructor(public socketService: SocketService, public quickbookconnect:QuickBookConnectService,public xeroconnect:XeroConnectService, public dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    this.socketService.newUser();
    this.socketService.messages.pipe(
      filter(val => val !== undefined),
      takeUntil(this.unsubscribe$),
    ).subscribe((res)=>{ 
    //this.socketService.messages.subscribe((res)=>{         
      if (res.message === "start") {
          this.reloadBusiness();
      } else if(res.message === "stop") { 
        if((res['data'].customers != undefined || res['data'].vendors != undefined) && (res['data'].customers.length > 0 || res['data'].vendors.length > 0)) {
          this.OpenInviteDialog(res['data']);
        }
        if(this._reloadingDialog) {
          this._reloadingDialog.close();
          this._reloadingDialog.afterClosed().subscribe(data=>{
          this.router.navigate(['/businesslist']);
          })
        }     
      }
    })   
  }

  public OpenInviteDialog(data) { console.log('open dialoge', data);
    const dialogRef = this.dialog.open(InvitationModalComponent, {
      data: data
    });
    dialogRef.afterClosed().subscribe(result => { console.log('after invite send: ', result);
      //if (result && result) {
        // this.businessService.connetDisconnect(companyid, status).subscribe(res => {
        //   this.getListOfbusinesses(this.userid);
        // });
      //}
    });
  }

  
  public onConnect() {
    const _self = this;
     this.connectedToBusiness='QuickBooks Online';
    var LeftPosition = (screen.width) ? (screen.width-600)/2 : 0;
    var TopPosition = (screen.height) ? (screen.height-700)/2 : 0;
    var settings ='height='+700+',width='+600+',top='+TopPosition+',left='+LeftPosition+',scrollbars='+scroll+',resizable';
    const windowObjectReference = window.open("","qb_window",settings);
    this.quickbookconnect.connect().subscribe(
      res => { 
        windowObjectReference.location.href = res['url'];
        windowObjectReference.focus();
        const message = function receiveMessage(event) { console.log('message: ', message);
          let data;
          data = JSON.parse(event["data"]);
          _self.reloadBusiness();
          window.removeEventListener("message", message, false);
        };
        window.addEventListener("message", message, false);
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
      }, err => { console.log('error:', err);
        windowObjectReference.close();
      });
  }

  public onXeroConnect() {
    const _self = this;
    this.connectedToBusiness='Xero';
    var LeftPosition = (screen.width) ? (screen.width-600)/2 : 0;
    var TopPosition = (screen.height) ? (screen.height-700)/2 : 0;
    var settings ='height='+700+',width='+600+',top='+TopPosition+',left='+LeftPosition+',scrollbars='+scroll+',resizable';
    const windowObjectReference = window.open("","qb_window",settings);
    this.xeroconnect.connect().subscribe(
      res => {     console.log('res: ', res);  
        windowObjectReference.location.href = res['url'];
        windowObjectReference.focus();
        const message = function receiveMessage(event) { console.log('event: ', event);
          let data;
            data = JSON.parse(event["data"]);
            _self.reloadBusiness();
            window.removeEventListener("message", message, false);    
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
      },
      data: {
        connectedSource: this.connectedToBusiness
      }
    });
   
  }

}
