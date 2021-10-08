import {AfterContentChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { of } from "rxjs";
import {
  debounceTime,
  map,
  distinctUntilChanged,
  filter
} from "rxjs/operators";
import { fromEvent } from 'rxjs';

import { FormControl } from '@angular/forms';
import { createSelector, Store, select } from '@ngrx/store';

import { TranslateService } from '@ngx-translate/core';
import { IAppState, IUiConfigState, IUser } from '../../../shared/interfaces';

import { Observable, Subscription } from "rxjs";
import { setDisable, setLanguage} from "../../../core/store/actions/ui-config.actions";

import { SEARCH_URL } from "../../../shared/constants";
import { HttpClient } from "@angular/common/http";
import { getNewDiscounts, requestDiscounts } from "../../../core/store/actions/home.actions";
import { HomeService } from "../../../core/services/home.service";


import { clearNotifications } from 'src/app/core/store/actions/notifications.actions';
import { Router } from "@angular/router";
import { ProfileService } from 'src/app/core/services/profile.service';
import { AuthService } from "../../../core/services/auth.service";

interface ITabItem {
  link: string,
  label: string
}

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss'],
})

export class HeadComponent implements OnInit, AfterContentChecked, OnDestroy {
  @ViewChild('discountSearchInput', { static: true }) discountSearchInput!: ElementRef;
  isSearchOnFocus$: Observable<boolean>;
  activeLink: string;
  SETTING_KEY = 'SETTINGS';
  languages = ['en', 'ru'];
  language$: Observable<any>;
  user$: Observable<IUser>;
  userRole: string | null;
  tabItems!: Array<ITabItem>;

  isHomeTile:boolean = false;

  public form: {
    filter: string;
  };

  iSnotifications$: number | undefined;
  unreadNotifications: any[] | undefined;
  aSub: Subscription;
  listIsVisibleOfUnreadNotes: boolean;
  currentRoute: string | undefined;

  constructor(private store: Store<IAppState>,
              private router: Router,
              private http: HttpClient,
              public homeService: HomeService,
              private auth: AuthService,
              private translateService: TranslateService,
              private profile: ProfileService,
              private change: ChangeDetectorRef) {

    this.user$ = this.profile.getUser();

    this.router.events.subscribe(value => {
      let currentRoute = router.url.toString();
      this.isHomeTile = currentRoute == '/home';
    });

    const selectNotifications = (state: IAppState) => state.notifications;
    const soreNotifications = this.store.select(selectNotifications);
    this.aSub = soreNotifications.subscribe((data) => {
      this.iSnotifications$ = data.notificationsUnread.length;
        this.unreadNotifications = data.notificationsUnread;
    });
    this.listIsVisibleOfUnreadNotes = false;

    this.activeLink = 'home';


    const selecUiConfig = (state: IAppState) => state.uiConfig;
    const selectSettingsLanguage = createSelector(
      selecUiConfig,
      (state: IUiConfigState) => state.appLanguage
    );

    const selectSearchOnFocus = createSelector(
      selecUiConfig,
      (state: IUiConfigState) => state.searchIsActive
    );

    this.isSearchOnFocus$ = this.store.select(selectSearchOnFocus);

    this.language$ = this.store.pipe(select(selectSettingsLanguage));
    this.language$.subscribe((lang) => {
      this.translateService.use(lang);
    });

    this.form = {
      filter: ""
    };
    this.userRole = sessionStorage.getItem('role');
  }

  onFocusEvent(e:any) {
   //todo disable filter, sorting and clear filter and sorting data
    this.setSearchOnFocus(e.type);
  }

  onBlur(e:any) {
   //todo available filter and sort by default
    this.setSearchOnFocus(e.type);
  }

  ngOnDestroy(): void {
    if(this.aSub) {
      this.aSub.unsubscribe();
    }
  }

  clearNotifications(){
    this.store.dispatch(clearNotifications())
  }

  ngOnInit(): void {
    //search
    fromEvent(this.discountSearchInput.nativeElement, 'keyup').pipe(
      // get value
      map((event: any) => {
        return event.target.value;
      })
      // if character length greater then 2
      , filter(res => res.length > 2 || res.length == 0)
      // Time in milliseconds between key events
      , debounceTime(2000)
      // If previous query is different from current
      , distinctUntilChanged()
      // subscription for response
    ).subscribe((text: string) => {

      this.searchGetCall(text).subscribe((res: any) => {
        if(res) {
          let searchData = res.map((discount:any)=>{
            return this.homeService.handleRemoteDiscount(discount);
          })
          this.store.dispatch(requestDiscounts({data: searchData}))
        } else {
          this.store.dispatch(requestDiscounts({data: []}))
        }
      }, (err) => {
        console.log('error', err);
      });

    });

    let localLang = localStorage.getItem(this.SETTING_KEY);
    if (localLang) {
      this.store.dispatch(setLanguage({ language: localLang }));
    }

    this.tabItems = (this.userRole === 'ROLE_ADMIN') ?
    [
     { link: 'home', label: 'COMMON.Head.home' },
     { link: 'profile', label: 'COMMON.Head.profile' },
     { link: 'vendor', label: 'COMMON.Head.vendor' },
     { link: 'statistic', label: 'COMMON.Head.statistic' },
     { link: 'admin', label: 'COMMON.Head.admin' },
    ]
    :
    [
     { link: 'home', label: 'COMMON.Head.home' },
     { link: 'profile/history', label: 'COMMON.Head.profile' },
    ];
  }

  ngAfterContentChecked() {
    this.change.detectChanges()
  }

  searchGetCall(term: string) {
    if (term === '') {
      this.store.dispatch(getNewDiscounts({ sortParam: '' }));
      return of([]);
    }

    const paramString = `searchText=${term}`;//size=2&
    return this.http.get(`${SEARCH_URL}?${paramString}`);
  }

  changeLocale(lang: string) {
    this.store.dispatch(setLanguage({ language: lang }));
    this.translateService.use(lang);
    localStorage.setItem(this.SETTING_KEY, lang);
  }

  toHistory(self:any){
    self.router.navigate(['/profile/history']);
  }

  toFavorite(self:any) {
    self.router.navigate(['/profile/favorite',]);
  }

  toActiveDiscounts(self:any) {
    self.router.navigate(['/profile/active']);
  }

  logout(self:any) {
    self.auth.logout();
  }

  profileMenuItems = [
    { link: 'history', label: 'COMMON.Head.history', function: this.toHistory },
    { link: 'favorite', label: 'COMMON.Head.favorite', function: this.toFavorite },
    { link: 'active', label: 'COMMON.Head.activeDiscounts', function: this.toActiveDiscounts },
    { link: 'logout', label: 'COMMON.Head.logout', function: this.logout },
  ];

  //function for menu items
  onClick(func:any, self:any){
    func(self);
  }

  controlListNotes(){
    this.listIsVisibleOfUnreadNotes = !this.listIsVisibleOfUnreadNotes;
  };

  setSearchOnFocus(val: any): void {
    this.store.dispatch(setDisable({ isSearchOnFocus: val !== 'blur' }));
  }
}
