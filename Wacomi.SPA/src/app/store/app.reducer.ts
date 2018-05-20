import { ActionReducerMap } from '@ngrx/store';
import * as fromAccount from '../account/store/account.reducers';
import * as fromPhoto from '../photo/store/photos.reducers';
import * as fromBlog from '../blog/store/blogs.reducers';

export interface AppState {
  account: fromAccount.State;
  photos: fromPhoto.State;
  blogs: fromBlog.State;
}

export const reducers: ActionReducerMap<AppState> = {
  account: fromAccount.accountReducer,
  photos: fromPhoto.photoReducer,
  blogs: fromBlog.blogReducer
};
