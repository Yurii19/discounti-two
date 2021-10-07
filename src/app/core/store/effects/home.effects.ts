import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { getNewDiscounts, requestDiscounts} from 'src/app/core/store/actions/home.actions';
import { HomeService } from 'src/app/core/services/home.service';


@Injectable()
export class HomeEffects {
  constructor(private actions$: Actions,
    private homeService : HomeService
    ) {}

  newDiscounts$ = createEffect(
    ()=> this.actions$.pipe(
      ofType(getNewDiscounts),
      mergeMap((action)=> this.homeService.requestDiscountsData(action.sortParam)
      .pipe(
         map( (data: any) => {
           const newData = data.map((el: any) => this.homeService.handleRemoteDiscount(el))
          return { type: 'requestDiscounts',data: newData};
          }))
    )
  ))

}
