import { Component, OnDestroy, OnInit, Inject, PLATFORM_ID, NgZone } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, Subject } from 'rxjs-compat';
// import { Services } from '../api/collections';
import { isPlatformBrowser } from '@angular/common';
import { TransferState } from '../../modules/transfer-state/transfer-state';
import { DataService } from '../api/data.service';
// import { makeStateKey, TransferState } from '@angular/platform-browser';
// import { MeteorServer } from '../api/meteor';
// import { MeteorObservable } from 'meteor-rxjs/dist/MeteorObservable';



@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [`#my-logout-button { background: #F44336 }`]
})

export class DashboardComponent implements OnDestroy, OnInit {
 services: Observable<any>;
 constructor(
  private _dataService: DataService,
 ) {

    //  this.services = this._dataService.call(
    //    'services',
    //    {filter: {}, fields: {name: 1}, sort: {name: 1}});
    this.services = this._dataService.getCollection('services', ['name', 'icon']);
 }
 ngOnInit() {
 }
 ngOnDestroy() {

 }
}
