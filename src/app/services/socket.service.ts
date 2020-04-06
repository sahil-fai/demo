import { Injectable } from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {SocketMessage} from '../models/socketmessage'
import { HelperService } from './helper-service/helper.service';
@Injectable({
  providedIn: 'root'
})
export class SocketService { 
  constructor(private socket: Socket, private helper_Service:HelperService ) { }
  messages = this.socket.fromEvent<SocketMessage>('users');
  newUser() {
    this.socket.emit('adduser',this.helper_Service.getuserId() );
  }
}
