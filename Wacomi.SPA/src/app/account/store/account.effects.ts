import { Injectable } from "@angular/core";
import { Actions, Effect } from '@ngrx/effects';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';

import * as AccountActions from './account.actions';
import * as PhotoActions from '../../photo/store/photos.action';
import * as BlogActions from '../../blog/store/blogs.actions';
import * as GlobalActions from '../../store/global.actions';
import { Router } from "@angular/router";
import { AuthUser } from "../../_models/AuthUser";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { AlertifyService } from "../../_services/alertify.service";
import { Observable } from "rxjs/Observable";

import { Action } from "@ngrx/store";
import { of } from "rxjs/observable/of";
import { AppUser } from "../../_models/AppUser";
import { Member } from "../../_models/Member";
import { BusinessUser } from "../../_models/BusinessUser";
import { Blog } from "../../_models/Blog";


@Injectable()
export class AccountEffects {
    baseUrl = environment.apiUrl;
    constructor(private actions$: Actions,
        private router: Router,
        private httpClient: HttpClient,
        private alertify: AlertifyService) { }

    //============== Authentication =================
    @Effect()
    authRegister = this.actions$
        .ofType(AccountActions.TRY_SIGNUP)
        .switchMap((action: AccountActions.TrySignup) => {
            return this.httpClient.post(this.baseUrl + 'auth',
                action.payload.registerInfo,
                {
                    headers: new HttpHeaders().set('Content-Type', 'application/json')
                })
                .mergeMap(() => {
                    return of({
                        type: AccountActions.TRY_LOGIN,
                        payload: {
                            UserName: action.payload.registerInfo.userName,
                            Password: action.payload.registerInfo.password
                        }
                    }
                    )
                }
                )
                .catch((error: string) => {
                    return of({ type: GlobalActions.FAILED, payload: error })
                })
        });

    @Effect()
    authSignIn = this.actions$
        .ofType(AccountActions.TRY_LOGIN)
        .switchMap((action: AccountActions.TryLogin) => {
            return this.httpClient.post<AuthUser>(this.baseUrl + 'auth/login', action.payload, { headers: new HttpHeaders().set('Content-Type', 'application/json') })
                .mergeMap((authUser: AuthUser) => {
                    this.router.navigate(['/home']);
                    return [
                        {
                            type: GlobalActions.SUCCESS,
                            payload: "ログインしました"
                        },
                        {
                            type: AccountActions.LOGIN,
                            payload: {appUser: authUser.appUser, token: authUser.tokenString}
                        }
                        // {
                        //     type: AccountActions.SET_TOKEN,
                        //     payload: { token: authUser.tokenString, appUser: authUser.appUser }
                        // },
                        // {
                        //     type: AccountActions.SET_APPUSER,
                        //     payload: authUser.appUser
                        // },

                    ];
                })
                .catch((error: string) => {
                    return of({ type: GlobalActions.FAILED, payload: "ログインに失敗しました: " + error })
                });
        });

    @Effect()
    login = this.actions$
            .ofType(AccountActions.LOGIN)
            .map((action: AccountActions.Login) => { return action.payload })
            .mergeMap((authInfo) => {
                this.router.navigate(['/home']);
                return [
                    {
                        type: AccountActions.SET_TOKEN,
                        payload: { token: authInfo.token, appUser: authInfo.appUser }
                    },
                    {
                        type: AccountActions.SET_APPUSER,
                        payload: authInfo.appUser
                    },
                ];
            })


    @Effect()
    setToken = this.actions$
        .ofType(AccountActions.SET_TOKEN)
        .map((action: AccountActions.SetToken) => { return action.payload.appUser })
        .map((appUser) => {
            switch (appUser.userType) {
                case "Member":
                    return { type: AccountActions.GET_MEMBER, payload: appUser.relatedUserClassId };
                case "Business":
                    return { type: AccountActions.GET_BISUSER, payload: appUser.relatedUserClassId };
                case "Admin":
                    return { type: GlobalActions.SUCCESS, payload: "Admin account"};

            }
            return { type: GlobalActions.FAILED, payload: "ユーザータイプ'" + appUser.userType + "'は存在しません" };
        })

    @Effect()
    getMember = this.actions$
        .ofType(AccountActions.GET_MEMBER)
        .map((action: AccountActions.GetMember) => { return action.payload })
        .switchMap((id) => {
            return this.httpClient.get<Member>(this.baseUrl + 'member/' + id);
        })
        .mergeMap((member) => {
            return [{
                type: AccountActions.SET_MEMBER,
                payload: member
            },
            {
                type: PhotoActions.GET_PHOTOS,
                payload: { type: 'member', recordId: member.id}
            },
            {
                type: BlogActions.GET_BLOG,
                payload: { type: 'member', recordId: member.id}
            }
        ];
        })
        .catch((error) => {
            return of({ type: GlobalActions.FAILED, payload: "メンバー情報の取得に失敗しました: " + error })
        })

    @Effect()
    getBisUser = this.actions$
        .ofType(AccountActions.GET_BISUSER)
        .map((action: AccountActions.GetBisUser) => { return action.payload })
        .switchMap((id) => {
            return this.httpClient.get<BusinessUser>(this.baseUrl + 'businessuser/' + id);
        })
        .mergeMap((bisUser) => {
            return [{
                type: AccountActions.SET_BISUSER,
                payload: bisUser
            },
            {
                type: PhotoActions.GET_PHOTOS,
                payload: { type: 'business', recordId: bisUser.id}
            },
            {
                type: BlogActions.GET_BLOG,
                payload: { type: 'business', recordId: bisUser.id}
            }];
        })
        .catch((error) => {
            return of({ type: GlobalActions.FAILED, payload: "メンバー情報の取得に失敗しました: " + error })
        })
    //============== Update user information =================
    @Effect()
    updateAppUser = this.actions$
        .ofType(AccountActions.UPDATE_APPUSER)
        .map((action: AccountActions.UpdateAppUser) => {
            return action.payload
        })
        .switchMap((appUser) => {
            return this.httpClient.put(this.baseUrl + 'appuser/' + appUser.id,
                appUser,
                {
                    headers: new HttpHeaders().set('Content-Type', 'application/json')
                })
        })
        .switchMap((appUser: AppUser) => {
            this.alertify.success("更新しました");
            return of({
                type: AccountActions.SET_APPUSER, payload: appUser
            });
        })
        .catch((error: string) => {
            return of({ type: GlobalActions.FAILED, payload: error })
        });

    @Effect()
    updateMember = this.actions$
        .ofType(AccountActions.UPDATE_MEMBER)
        .map((action: AccountActions.UpdateMember) => {
            return action.payload
        })
        .switchMap((member) => {
            return this.httpClient.put(this.baseUrl + 'member/' + member.id,
                member,
                {
                    headers: new HttpHeaders().set('Content-Type', 'application/json')
                })
                .map(() => {
                    this.alertify.success("更新しました");
                    return {
                        type: AccountActions.GET_MEMBER, payload: member.id
                    };
                })
                .catch((error: string) => {
                    return of({ type: GlobalActions.FAILED, payload: error })
                });
        })

    @Effect()
    updateBisUser = this.actions$
        .ofType(AccountActions.UPDATE_BISUSER)
        .map((action: AccountActions.UpdateBisUser) => {
            return action.payload
        })
        .switchMap((bisuser) => {
            return this.httpClient.put(this.baseUrl + 'businessuser/' + bisuser.id,
                bisuser,
                {
                    headers: new HttpHeaders().set('Content-Type', 'application/json')
                })
                .map(() => {
                    this.alertify.success("更新しました");
                    return {
                        type: AccountActions.GET_BISUSER, payload: bisuser.id
                    };
                })
                .catch((error: string) => {
                    return of({ type: GlobalActions.FAILED, payload: error })
                });
        })

    @Effect()
    authLogout = this.actions$
        .ofType(AccountActions.LOGOUT)
        .mergeMap(() => {
            this.router.navigate(['/home'])

            return [
                { type: GlobalActions.SUCCESS, payload: "ログアウトしました" },
                { type: PhotoActions.CLEAR_PHOTO},
                { type: BlogActions.CLEAR_BLOG}
            ]
        })

    @Effect()
    tokenExpired = this.actions$
        .ofType(AccountActions.TOKEN_EXPIRED)
        .mergeMap(() => {
            this.router.navigate(['/home'])
            return [
                { type: PhotoActions.CLEAR_PHOTO},
                { type: BlogActions.CLEAR_BLOG}
            ]
        })
}