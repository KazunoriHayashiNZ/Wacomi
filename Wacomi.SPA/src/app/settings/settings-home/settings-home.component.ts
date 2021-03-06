import { Component, OnInit } from '@angular/core';
import { City } from '../../_models/City';
import { Hometown } from '../../_models/Hometown';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from '../../_models/AppUser';
import { Photo } from '../../_models/Photo';
import { Observable } from 'rxjs/Observable';

import * as fromApp from '../../store/app.reducer';
import * as fromPhoto from '../../photo/store/photos.reducers';
import * as fromBlog from '../../blog/store/blogs.reducers';
import * as PhotoActions from '../../photo/store/photos.action';
import * as BlogActions from '../../blog/store/blogs.actions';
import { Store } from '@ngrx/store';
import { KeyValue } from '../../_models/KeyValue';
import { UserAccount } from '../../_models/UserAccount';
import { MemberProfile } from '../../_models/MemberProfile';
import { BusinessProfile } from '../../_models/BusinessProfile';
import { Blog } from '../../_models/Blog';

@Component({
  selector: 'app-settings-home',
  templateUrl: './settings-home.component.html',
  styleUrls: ['./settings-home.component.css']
})
export class SettingsHomeComponent implements OnInit {
  // photoState: Observable<fromPhoto.State>;
  // blogState: Observable<fromBlog.State>;
  // blogs: Blog[];
  
  account: UserAccount;
  appUser: AppUser;
  member: MemberProfile;
  bisUser: BusinessProfile;
  cities: City[];
  hometowns: KeyValue[];
  photos: Photo[];
  
  constructor(private store: Store<fromApp.AppState>, private route: ActivatedRoute) { }

  ngOnInit() {
    // this.photoState = this.store.select('photos');
    //this.blogState = this.store.select('blogs');

    this.appUser = this.route.snapshot.data['appUser'];
    this.account = this.route.snapshot.data['account'];
    this.cities = this.route.snapshot.data['cities'];
    this.hometowns = this.route.snapshot.data['hometowns'];
    this.photos = this.route.snapshot.data['photos'];
    // this.blogs = this.route.snapshot.data['blogs'];
    if(this.appUser.userType == "Member"){
      this.member = this.route.snapshot.data['member'];
      this.bisUser = null;
   }
    else{
      this.bisUser = this.route.snapshot.data['bisUser'];
      this.member = null;
    }
    // this.store.dispatch(new PhotoActions.GetPhotos({type: this.appUser.userType, recordId: recordId}));
    // this.store.dispatch(new BlogActions.GetBlog(this.appUser.id));
    //this.store.dispatch(PhotoActions.SET_PHOTOS)

  }

}
