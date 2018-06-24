import { Mongo } from 'meteor/mongo';

declare global {
    interface GroundBaseCollection<T> extends Mongo.Collection<any> {
        orgFind(selector?: Mongo.ObjectID | string | any, options?: {
            sort?: Mongo.SortSpecifier;
            skip?: number;
            limit?: number;
            fields?: Mongo.FieldSpecifier;
            reactive?: boolean;
            transform?: Function;
        }): Mongo.Cursor<T>;
        orgFindOne(selector?: Mongo.ObjectID | string | any, options?: {
            sort?: Mongo.SortSpecifier;
            skip?: number;
            fields?: Mongo.FieldSpecifier;
            reactive?: boolean;
            transform?: Function;
        }): T;
    }
    interface Array<T> {
        insert(index?: number, item?: any): Array<T> | undefined;
        /**
         * Insert Array or elements in an Array and keep flatten aary
         * Use Like: // ["a", "b", "c", "d"].insert1(2, "V", ["W", "X", "Y"], "Z") call like this will return:
         * Result: // ["a","b","V",["W","X","Y"],"Z","c","d"]
         *
         *
         */
        insertArrayAsArray(index?: number, ...args): Array<T> | undefined;
        /**
         * Insert Array or elements in an Array and keep flatten aary
         * Use like:  ["a", "b", "c", "d"].insertArray(2, 'V', ["W", "X", "Y"])
         * Result: ["a","b","V","W","X","Y","c","d"]
         *
         *
         */
        insertArray(index: number, ...args): Array<T> | undefined;

        /**
         * Flatten a complex Array of Arrays
         * // [[[[[0]], [1]], [[[2], [3]]], [[4], [5]]]].flatten()
         * // [0, 1, 2, 3, 4, 5]
         *
         */
        flatten(): T | undefined;

    }

    // interface Error{
    //     code?: number;
    //     message?: string;
    //     reason?: string;
    // }
    interface TwitterUser {
        id: string;
        screenName: string;
        accessToken: string;
        accessTokenSecret: string;
        profile_image_url: string;
        profile_image_url_https: string;
        lang: string;
        email: string;
    }
    interface FacebookUser {
        id: string;
        name: string;
        first_name: string;
        last_name: string;
        link: string;
        expiresAt: number;
        accessToken: string;
        locale: string;
        email: string;
        age_range: {
            min: number;
        }
    }
    interface RATING{
        aggregateValue: number;
        ratingA: number;
        ratingB: number;
        ratingC: number;
        ratingD: number;
        ratingE: number;
        reviewCount: number;
    }
    interface USER{
        _id?: string;
        emails?: Array<Meteor.UserEmail>;
        username?: string;
        phone?: {
            number: number;
            verified: boolean;
        };
        services?: {
            phone: {
                verify: {
                    phone: {
                        number: number;
                    }
                }
            };
            resume: {
                loginTokens: [
                    {
                        when: Date;
                        hashedToken: string;
                    }
                ]
            };
            facebook: FacebookUser;
            twitter: TwitterUser;
            password: {
                bcrypt: string;
            };
            creditCards: Array<CREDITCARD>;
            
        };
        profile?: {
            changePassword?: boolean;
            name: string;
            refCode: number;
            cellPhone: string;
            isSetup: boolean;
            address: {
                default: FOCLOCATION;
                locations: Array<FOCLOCATION>;
            };
            aggregateRating: RATING;
            dob: Date;
            code: number;
            designation: string;
            gender: string;            
            dpImageId: string;
            bgImageId: string;
            dpThumbUrl: string;
            dpThumb40Url: string;
            dpThumb96Url: string;
            bgUrl: string;
            bgThumb40Url: string;
            bgThumb96Url: string;
            avatar: {
                small: string;
                medium: string;
                large: string;
            };
            
        };
        business?: {
            address?: {
                default?: FOCLOCATION;
                locations?: Array<FOCLOCATION>
            };
            aggregateRating?: RATING;
            tags?: Array<string>;
            organization?: string;
            serviceIds?: Array<string>;

        }
        roles?: any;
        updatedAt?: Date;
        createdAt?: number | Date;
        fcmTokens?: Array<string>;
        notificationKey?: string;
    }
}

interface ExternalService {
    login?(nativeLoginService: any):any;
}
declare module 'meteor/meteor' {
    namespace Meteor {
        function linkWithTwitter();
        function linkWithGoogle();
        var fixonclick: {
            facebook: ExternalService;
            google: ExternalService;
            twitter: ExternalService;
            password: ExternalService;
        }    
    }    
}

declare module 'meteor/accounts-base' {
    namespace Accounts {
        function callLoginMethod(options);
    }
}
