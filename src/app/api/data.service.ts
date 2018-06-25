import { Injectable, Inject, PLATFORM_ID, NgZone } from '@angular/core';
import { TransferState } from '../../modules/transfer-state/transfer-state';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { ROOT_URL } from '../../../constants';
import { Observable } from 'rxjs-compat';

@Injectable()
export class DataService {
    Categories: Mongo.Collection<CATEGORY>;
    Services: Mongo.Collection<SERVICE>;
    ddpServer: any;
    MeteorObservable: any;

    constructor(
        @Inject(PLATFORM_ID) public platformId: string,
        private zone: NgZone,
        private transferState: TransferState,
    ) {
        console.log('Instantiating Service on Server...');
        if (isPlatformServer(this.platformId)) {
            const DDPClient = require('ddp');
            this.ddpServer = require('./meteor').MeteorServer;
        } else {
            this.MeteorObservable = require('meteor-rxjs').MeteorObservable;
            this.Services = require('./collections').Services;
            this.Categories = require('./collections').Categories;
        }

    }
    call(...args) {
        const methodName = args[0];
        const methodArgs = args.slice(1, args.length);
        console.log(methodName, methodArgs);
        if (isPlatformServer(this.platformId)) {
            let done: boolean = false;
            let data: any;
            this.ddpServer.call(methodName, methodArgs, (err, res) => {
                if (err) {
                    console.log(err);
                    done = true;
                }

                data = res;
                console.log('data recieved');
                done = true;
            });
            require('deasync').loopWhile(function() {return !done; });
            this.transferState.set('server_data', data);
            return Observable.of(data);
        } else {
            let data = this.transferState.get('server_data');
            if (data) {
                this.transferState.set('server_data', null);
                return Observable.of(data);
            }
            return this.MeteorObservable.call(...args);
        }
    }

    getCollection(collectionName: string, fields?: string[]) {
        let data;
        if (isPlatformServer(this.platformId)) {
            const collection = this.ddpServer.collections[collectionName];
            if (!collection) return [];
            const _ = require('underscore');
            data = [];
            _.forEach(collection, (value, key) => {
                if (fields) data.push(_.pick(value, fields));
                else data.push(value);
            });
            this.transferState.set('server_data', data);
            return  Observable.of(data || []);
        }

        data = this.transferState.get('server_data');
        if (data) {
            this.transferState.set('server_data', null);
            return Observable.of(data);
        }
        return this.MeteorObservable.call(collectionName);
    }

    getCollectionDataById(collectionName: string, id: string) {
        if (!this.ddpServer.collections[collectionName]) return;
        let data;
        if (isPlatformServer(this.platformId)) {
            data = this.ddpServer.collections[collectionName][id];
            this.transferState.set('server_data', data);
            return Observable.of(data);
        }
        data = this.transferState.get('server_data');
        if (data) {
            this.transferState.set('server_data', null);
            return Observable.of(data);
        }
        // return this.MeteorObservable.call(collectionName)

    }

}
