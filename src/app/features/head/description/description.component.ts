import { Component, OnInit } from '@angular/core';
import { createSelector, Store, select } from '@ngrx/store';
import {
  IAppState,
  IDescription,
  IMapMarker,
} from '../../../shared/interfaces';
import { Observable } from 'rxjs';
import {
  getDescription,
  addToFavourite,
  removeFromFavourite,
} from '../../../core/store/actions/description.actions';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { getPromo } from 'src/app/core/store/actions/notifications.actions';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss'],
})
export class DescriptionComponent implements OnInit {
  descriptionData$: Observable<IDescription>;
  markers$: any;
  discountId: string;
  discountMarker!: IMapMarker[];

  constructor(
    private activateRoute: ActivatedRoute,
    private http: HttpClient,
    private store: Store<IAppState>
  ) {
    this.discountId = activateRoute.snapshot.params['id'];

    const selecDescription = (state: IAppState) => state.description;

    const selectDescription = createSelector(
      selecDescription,
      (state: any) => state.description
    );
    this.descriptionData$ = this.store.pipe(select(selectDescription));
    const selectMarkers = createSelector(selecDescription, (state) => [
      {
        cords: state.description.vendorLocations.map((el) => [
          el.latitude,
          el.longitude,
        ]),
        text: `${state.description.description}`,
      },
    ]);

    this.markers$ = this.store.select(selectMarkers);
  }

  ngOnInit(): void {
    this.store.dispatch(getDescription({ id: this.discountId }));
    this.descriptionData$.subscribe((discount) => {
      if (!discount) {
        return;
      }
      const cords = discount.vendorLocations.map((location: any) => [
        location.latitude,
        location.longitude,
      ]);
      let marker: IMapMarker = {
        cords: cords,
        text: discount.name,
      };
      this.discountMarker = [marker];
    });
  }

  addToFavorite(data: IDescription) {
    if (data.favorite) {
      this.store.dispatch(removeFromFavourite({ discountId: data.id }));
    } else {
      this.store.dispatch(addToFavourite({ discountId: data.id }));
    }
  }

  activateCoupon() {
    this.store.dispatch(getPromo({ discountId: this.discountId }));
  }
}
