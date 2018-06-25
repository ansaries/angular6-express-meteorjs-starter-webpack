import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_BOOTSTRAP_LISTENER, ApplicationRef } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { ServerTransferStateModule } from '../modules/transfer-state/server-transfer-state.module';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { TransferState } from '../modules/transfer-state/transfer-state';
import { BrowserModule } from '@angular/platform-browser';
import { filter, first } from 'rxjs/operators';
import { DataService } from './api/data.service';

export function onBootstrap(
  appRef: ApplicationRef,
  transferState: TransferState,
  // dataService: DataService
) {
  return () => {
    appRef.isStable.pipe(
      filter(stable => stable),
      first())
      .subscribe(() => {
        transferState.inject();
      });
  };
}

@NgModule({
  bootstrap: [AppComponent],
  providers: [
    {
      provide: APP_BOOTSTRAP_LISTENER,
      useFactory: onBootstrap,
      multi: true,
      deps: [
        ApplicationRef,
        TransferState,
        // DataService,
      ]
    },
    // DataService,
  ],
  imports: [
    BrowserModule.withServerTransition({
      appId: 'my-app-id'
    }),
    NoopAnimationsModule,
    ServerModule,
    ServerTransferStateModule,
    AppModule
  ]
})
export class ServerAppModule {

}
