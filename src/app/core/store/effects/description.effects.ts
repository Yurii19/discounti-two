import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import {getDescription, requestDescription, addToFavourite, removeFromFavourite} from '../actions/description.actions';
import { DescriptionService } from '../../services/description.service';
import { map, mergeMap } from "rxjs/operators";

@Injectable()
export class DescriptionEffects {
  constructor(
    private actions$: Actions,
    private descriptionService: DescriptionService
  ) {}

  descriptionData$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(getDescription),
        mergeMap((id) => this.descriptionService.getDescriptionRequest(id)
          .pipe(
            map( (data: any) => {
              const description = this.descriptionService.handleRemoteDescription(data)
              return { type: 'requestDescription', data: description};
            })
          )
      ))
    )

  addToFavorite$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addToFavourite),
        mergeMap((props) => this.descriptionService.addToFavoriteRequest({discountId: props.discountId})
          .pipe(
            map( (data: any) => {
              const description = this.descriptionService.handleRemoteDescription(data)
              return { type: 'requestDescription', data: description};
            })
          )
        ))
  )

  removeFromFavorite$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(removeFromFavourite),
        mergeMap((props) => this.descriptionService.removeFromFavoriteRequest({discountId: props.discountId})
          .pipe(
            map( (data: any) => {
              const description = this.descriptionService.handleRemoteDescription(data)
              return { type: 'requestDescription', data: description};
            })
          )
        ))
  )
}
