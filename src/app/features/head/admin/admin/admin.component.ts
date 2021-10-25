import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  @Input() adminData: any = { name: 'Admin' };
  title: string = 'admin component';
  baseUrl: string = 'https://api.github.com/users';
  newUserName: string;
  userInfo: any = [];
  userInfo1: any = [];

  usersNumber =  0;

  userList: string[] = [];

  inputUserFC = new FormControl('admin');

  constructor(private http: HttpClient) {
    this.inputUserFC.patchValue('Yurko');
    this.newUserName = this.inputUserFC.value;
  }

  ngOnInit(): void {

    
  }

  clear() {
    this.inputUserFC.patchValue('');
    this.newUserName = this.inputUserFC.value;
  }

  addNewUser() {
    const name = this.inputUserFC.value;
    if(this.userList.includes(name)){
      return;
    }
    this.http.get(`${this.baseUrl}/${name}`).subscribe(
      (resp) => {
        this.userInfo = resp;
        this.userList = [this.inputUserFC.value, ...this.userList]
        console.log('Resp', resp)

       // for (const key in resp) {
        //  console.log(resp[key])
        //  }
      },
      (error) => {
        alert('The user does not exist !');
        console.log('Error >>> ', error);
      }
    );
  }

  inputUser(val: any) {
    const name = val.target.value;
    this.newUserName = name;
  }

  setOfUsersNumber(){
    this.usersNumber = this.userList.length;
  }
}
