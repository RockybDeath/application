import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { GetUser, GetUserError, GetUserSuccess } from '../actions/user.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { UserService } from '../../services/user.service';

@Injectable()
export class UserEffects {
  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetUser),
      switchMap(() =>
        this.userService.getUser().pipe(
          map((user) => GetUserSuccess({ payload: user })),
          catchError((err) => of(GetUserError({ error: err })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private userService: UserService) {}
}
