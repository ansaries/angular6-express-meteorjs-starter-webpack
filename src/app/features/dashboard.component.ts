import { Component, OnDestroy, OnInit, Inject, PLATFORM_ID, NgZone } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, Subject } from 'rxjs-compat';
// import { Services } from '../api/collections';
import { isPlatformBrowser } from '@angular/common';
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
 ) {

   if (isPlatformBrowser(this.platformId)) {
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
     MeteorServer.call(
       'services',
       [{filter: {}, fields: {name: 1}, sort: {name: 1}}],
       ((err, data) => {
         try {
           const services = MeteorServer.collections.services;
           this.services = Observable.of(data || []);
           console.log(services.length, data);
         } catch (e) {
          console.log(e);
         } finally {
           done = true;
         }
     }));
     require('deasync').loopWhile(function() {return !done; });
    }
 }
 ngOnInit() {
 }
 ngOnDestroy() {

 }
}
