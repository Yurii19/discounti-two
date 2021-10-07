import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IDiscount } from '../../../../../shared/interfaces';
import { map } from 'rxjs/operators';
import { HomeService } from '../../../../../core/services/home.service';
import { ProfileService } from '../../../../../core/services/profile.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
})
export class FavoriteComponent implements OnInit {
  profileFavorite$!: Observable<IDiscount[]>;
  constructor(
    public homeService: HomeService,
    private profile: ProfileService
  ) {}

  ngOnInit(): void {
    this.profileFavorite$ = this.profile.getFavorite().pipe(
      map((data: any) => {
        const newData = data.map((el: any) =>
          this.homeService.handleRemoteDiscount(el)
        );
        return newData;
      })
    );
  }
}
