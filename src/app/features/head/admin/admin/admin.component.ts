import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  @Input() adminData: any = { name: 'Admin' };

  title: string = 'admin component';
  baseUrl: string = 'https://api.github.com/users';
  newUserName: string = '';
  userInfo: any = [];
  userInfo1: any = [];

  usersNumber = 0;

  userList: string[] = [];

  inputUserFC = new FormControl('');

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  clear() {
    this.inputUserFC.patchValue('');
    this.newUserName = this.inputUserFC.value;
  }

  addNewUser() {
    const name = this.inputUserFC.value;
    if (this.userList.includes(name)) {
      return;
    }
    this.receiveUser(name).subscribe(
      (resp) => {
        this.userInfo = resp;
        this.userList = [this.inputUserFC.value, ...this.userList];
      },
      (error) => {
        alert('The user does not exist !');
        console.log('Error >>> ', error);
      }
    );
  }

  receiveUser(login: string): Observable<any>{
    return this.http.get(`${this.baseUrl}/${login}`);
  }

  inputUser() {
    this.newUserName = this.inputUserFC.value;
  }

  setOfUsersNumber() {
    this.usersNumber = this.userList.length;
  }
}
