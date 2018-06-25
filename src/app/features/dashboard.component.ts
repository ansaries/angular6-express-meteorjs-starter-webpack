import { Component, OnDestroy, OnInit, Inject, PLATFORM_ID, NgZone } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, Subject } from 'rxjs-compat';
// import { Services } from '../api/collections';
import { isPlatformBrowser } from '@angular/common';
import { TransferState } from '../../modules/transfer-state/transfer-state';
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
  @Inject(PLATFORM_ID) public platformId: string,
  private zone: NgZone,
  private transferState: TransferState,
 ) {

   if (isPlatformBrowser(this.platformId)) {
     if ((this.transferState.get('serviceKey') || []).length > 0) {
       this.services = Observable.of(this.transferState.get('serviceKey') || []);
       return;
     }
     const Services = require('../api/collections').Services;
     const MeteorObservable = require('meteor-rxjs').MeteorObservable;
     MeteorObservable.subscribe('services').subscribe(() => {
       this.services = Services.find();
     });
   } else {
     console.log('server');
     const MeteorServer = require('../api/meteor').MeteorServer;
     // console.log(MeteorServer);
     let done;
     let services;
     MeteorServer.call(
       'services',
       [{filter: {}, fields: {name: 1}, sort: {name: 1}}],
       ((err, data) => {
         try {
           this.services = Observable.of(data || []);
           services = data;
           console.log(data.length);
          } catch (e) {
            console.log(e);
          } finally {
            done = true;
          }
        }));
        require('deasync').loopWhile(function() {return !done; });
        console.log('Setting TranferState: ', services.length);
        this.transferState.set('serviceKey', services);

    }
 }
 ngOnInit() {
 }
 ngOnDestroy() {

 }
}
