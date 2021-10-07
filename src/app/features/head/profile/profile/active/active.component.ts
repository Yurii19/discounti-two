import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../../../core/services/profile.service';
import { Observable } from 'rxjs';
import { IFavoritesProfile } from '../../../../../shared/interfaces';
import { map } from 'rxjs/operators';
import { HomeService } from '../../../../../core/services/home.service';

@Component({
  selector: 'app-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.scss'],
})
export class ActiveComponent implements OnInit {
  profileCoupons$!: Observable<IFavoritesProfile[]>;

  constructor(
    private profile: ProfileService,
    public homeService: HomeService
  ) {}

  ngOnInit(): void {
    this.profileCoupons$ = this.profile.getCoupons().pipe(
      map((data: any) => {
        return data;
      })
    );
  }
}
