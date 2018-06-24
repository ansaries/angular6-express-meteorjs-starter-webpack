import { Component, OnDestroy, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { Services } from '../api/collections';
import { MeteorObservable } from 'meteor-rxjs';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [`#my-logout-button { background: #F44336 }`]
})

export class DashboardComponent implements OnDestroy, OnInit {
 services: Observable<any>;
 constructor(
  @Inject(PLATFORM_ID) public platformId: string
 ) {

 }
 ngOnInit() {
  if (isPlatformBrowser(this.platformId)) {
    MeteorObservable.subscribe('services').subscribe(() => {
      this.services = Services.find();
    });
  }
 }
 ngOnDestroy() {

 }
}
