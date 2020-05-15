import { Injectable } from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {SocketMessage} from '../models/socketmessage'
import { HelperService } from './helper-service/helper.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as io from 'socket.io-client';

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
