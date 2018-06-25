import { UserService } from './user/user.service';
import { RouterStateSerializer } from '@ngrx/router-store';
import { CustomSerializer } from './reducers/index';
import { TransferState } from '@angular/platform-browser';
import { DataService } from './api/data.service';

export const APP_PROVIDERS = [
  { provide: RouterStateSerializer, useClass: CustomSerializer },
  UserService,
  TransferState,
  DataService,
];
