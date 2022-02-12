import { Component, OnInit, Output } from '@angular/core';
import {EventEmitter } from '@angular/core';

@Component({
  selector: 'app-username',
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.css']
})
export class UsernameComponent implements OnInit {
  @Output() userNameEvent = new EventEmitter<string>();

  username:string = "";

  constructor() { }

  ngOnInit(): void {
  }

  setUserName(){
    this.userNameEvent.emit(this.username);
    console.log("the new user name is " , this.username)
  }

}
