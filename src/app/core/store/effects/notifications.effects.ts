import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { getPromo } from '../actions/notifications.actions';
import { NotificationsService } from '../../services/notifications.service';
import { NotificationService } from "../../services/notification.service";

@Injectable()
export class NotificationsEffects {
  constructor(private actions$: Actions,
    private notificationsService : NotificationsService,
              private notification: NotificationService
    ) {}

  activatePromo$ = createEffect(
    ()=> this.actions$.pipe(
      ofType(getPromo),
      mergeMap((action)=> this.notificationsService.requestPromo( action.discountId )
      .pipe(
         map( (data: any) => {
           const newData =  { promo : data.discount.promo, discountName: data.discount.name };
           this.notification.success("Coupon is activated");
          return { type: 'RequestPromo', data: newData};
          }))
    )
  ))

}
