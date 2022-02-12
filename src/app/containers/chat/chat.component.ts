import { Component, OnInit } from '@angular/core';
import * as io from "socket.io-client"
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  username = "";
  message = "";
  messageList: { message: string, username: string, mine: boolean }[] = [{message:"heelo" , username:"admin" , mine:false} ];
  userList: string[] = [];
  socket: any;

  constructor() { }


  userNameUpdate(name: string): void {
    this.socket = io.io(`localhost:3000?username=${name}`);
    this.username = name;

    this.socket.emit("set-user-name", name);

    this.socket.on("user-list", (userList: string[]) => {
      this.userList = userList;
    })

    this.socket.on("message-broadcast", (data: { message: string, username: string }) => {
      if (data) {
        this.messageList.push({ message: data.message, username: data.username, mine: false })
      }
    })
  }

  sendMessage(): void {
    this.socket.emit("message", this.message);
    this.messageList.push({ message: this.message, username: this.username, mine: true });
    this.message = "";
  }

}
