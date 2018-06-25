import { MongoObservable } from 'meteor-rxjs';



// An interface to create orgFind Method in Mong.Collection.

export const Posts = new MongoObservable.Collection<any>('posts');
