import { Injectable } from '@angular/core'
import { Effect, Actions, ofType } from '@ngrx/effects'
import { User } from '../../models/user.model'
import { AngularFireAuth } from '@angular/fire/auth'
import { Observable } from 'rxjs'
import 'rxjs/add/observable/fromPromise'
import 'rxjs/add/observable/of'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/delay'


import * as userActions from '../actions/user.actions'
import * as firebase from 'firebase'

export type Action = userActions.All

@Injectable()
export class UserEffects {

    constructor(private actions: Actions, private afAuth: AngularFireAuth) { }

    @Effect()
    getUser: Observable<Action> = this.actions.pipe(ofType(userActions.GET_USER)
        .map((action: userActions.GetUser) => action.payload)
        .switchMap(payload => this.afAuth.authState)
        .map(authData => {
            if (authData) {
                const user = new User(authData.uid, authData.displayName)
                return (new userActions.Authenticated(user))
            } else {
                return (new userActions.NotAuthenticated())
            }
        })
        .catch(err => Observable.of(new userActions.AuthError()))
    )
    
    @Effect()
    login: Observable<Action> = this.actions.ofType(userActions.GOOGLE_LOGIN)
        .map((action: userActions.GoogleLogin) => action.payload)
        .switchMap(payload => {
            return Observable.fromPromise(this.googleLogin())
        })
        .map(credential => {
            return new userActions.GetUser()
        })
        .catch(err => {
            return Observable.of(new userActions.AuthError({ error: err.message }))
        })

    @Effect()
    logout: Observable<Action> = this.actions.ofType(userActions.LOGOUT)
        .map((action: userActions.Logout) => action.payload)
        .switchMap(payload => {
            return Observable.of(this.afAuth.auth.SignOut())
        })
        .map(authData => {
            return new userActions.NotAuthenticated()
        })
        .catch(err => {
            return Observable.of(new userActions.AuthError({ error: err.message }))
        })

    private googleLogin(): firebase.Promise<any> {
        const provider = new firebase.auth.GoogleAuthprovider();
        return this.afAuth.auth.signInWithPopup(provider);


    }


}


