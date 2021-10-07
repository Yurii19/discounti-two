import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/shared/interfaces';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  displayHistory: string[] = ['Name', 'Promo', 'EndDate'];
  user$: Observable<IUser>;

  tabs:[{ tabName: string; path: string ,isActive: boolean}, { tabName: string; path: string,isActive: boolean }, { tabName: string; path: string,isActive: boolean }] = [
    { tabName: 'COMMON.Profile.title.history', path: 'history', isActive: true},
    { tabName: 'COMMON.Profile.title.favorite', path: 'favorite', isActive: false},
    { tabName: 'COMMON.Profile.title.active', path: 'active', isActive: false}
  ]

  constructor ( private profile: ProfileService ) {
    this.user$ = this.profile.getUser();
  }

  ngOnInit() {}
}
