import { Injectable } from '@angular/core';
import {Socket} from 'ngx-socket-io';
import { HelperService } from './helper-service/helper.service';


@Injectable({
  providedIn: 'root'
})

export class SocketService { 
  constructor(private socket: Socket, private helper_Service:HelperService ) { }
  messages = this.socket.fromEvent<any>('users');
  newUser() { 
   this.socket.emit('adduser',this.helper_Service.getuserId() );
  }
}
