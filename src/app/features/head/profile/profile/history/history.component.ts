
import { OnInit, Component } from '@angular/core';
import { ProfileService } from '../../../../../core/services/profile.service';
import { Observable } from 'rxjs';
import { IFavoritesProfile } from '../../../../../shared/interfaces';
import { map } from 'rxjs/operators';
import { HomeService } from '../../../../../core/services/home.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  displayHistory: string[] = ['Name', 'Promo', 'EndDate'];
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
