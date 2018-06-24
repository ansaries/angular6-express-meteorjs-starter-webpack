export const DEFAULT_PICTURE_URL = 'assets/images/avatars/profile.jpg';
export enum MessageType {
    TEXT = <any>'text',
    LOCATION = <any>'location',
}
interface UserShortObject {
    _id: string;
    name: string;
    imageId?: string;
}
interface SettingValue {
    value: boolean;
    scheduled: number;
}
interface DeviceSetting {
    promotionLead?: SettingValue;
    newChatThread?: SettingValue;
    newQuote?: SettingValue;
    quoteView?: SettingValue;
    quotedValueUpdate?: SettingValue;
    quoteAccepted?: SettingValue;
    quoteAcceptedCSR?: SettingValue;
    quoteAcceptedSP?: SettingValue;
    quoteRejected?: SettingValue;
    quoteShortlisted?: SettingValue;
    newLead?: SettingValue;
    newUPLead?: SettingValue;
    UPLead?: SettingValue;
    leadView?: SettingValue;
    leadPublishCustomer?: SettingValue;
    leadFavorite?: SettingValue;
    newReview?: SettingValue;
    reviewUpdated?: SettingValue;
    newComment?: SettingValue;
    commentUpdate?: SettingValue;
    newReviewLike?: SettingValue;
    newCommentLike?: SettingValue;
    newPayment?: SettingValue;
}
interface NotificationDoc {
    _id?: string;
    leadId?: string;
    leadTitle?: string;
    quotedValue?: number;
    createdAt?: Date;
    updatedAt?: Date;
    customer?: {
        _id?: string;
        name?: string;
    };
    owner?: {
        _id?: string;
        name?: string;
        imageId?: string;
    };

}
interface CHATMEMBER {
    _id: string;
    name: string;
    avatar?: string;
    unread?: number;
    deleted?: boolean;
}
interface SHORTJOB {
    _id: string;
    title: string;
}
interface SHORTIMAGE {
    id?: string;
    url?: string;

}
interface ADDR {
    long_name: string;
    short_name: string;
    types: Array<string>;
}


declare global {
    interface SERVICE {
        _id?: string;
        name?: string;
        description?: string;
        detail?: string;
        categoryIds?: [string];
        publish: boolean;
        image?: {
            id: string;
            url: string;
            alt: string;
        };
        relatedServiceIds?: [string];
    }

    interface CATEGORY {
        _id?: string;
        name?: string;
        description?: string;
        image?: {
            id: string;
            url: string;
            alt: string;
        };
    }
    interface TotalSent {
        unread?: {
            quotes?: number,
            leads?: number,
            messages?: number,
            emails?: number,
            reviews?: number,
            tasks?: number,
        };
        updated?: {
            quotes?: number,
            leads?: number,
            messages?: number,
            emails?: number,
            reviews?: number,
            tasks?: number,
        };
        total?: {
            quotes?: number,
            shortlisted?: number,
            rejected?: number,
            leads?: number,
            jobs?: number,
            messages?: number,
            emails?: number,
            reviews?: number,
            tasks?: number,
            saving?: number,
        };
    }
    interface TOTALS {
        _id?: string;
        userId?: string;
        sent?: TotalSent;
        recieved?: TotalSent;
        notifications: {
            chatThreads: number;
            leads: number;
            quotes: number;
            reviews: number;
        };
    }


    interface toastr {
        error(message: string, title: string, options: Object);
        info(message: string, title: string, options: Object);
        warning(message: string, title: string, options: Object);
        success(message: string, title: string, options: Object);
    }

    interface IMAGE {
        _id?: string;
        complete?: boolean;
        extension?: string;
        name?: string;
        progress?: number;
        size?: number;
        store?: string;
        token?: string;
        type?: string;
        uploadedAt?: Date;
        uploading?: boolean;
        url?: string;
        userId?: string;
        path?: string;
    }
    interface THUMB {
        _id?: string;
        complete?: boolean;
        extension?: string;
        name?: string;
        progress?: number;
        size?: number;
        store?: string;
        token?: string;
        type?: string;
        uploadedAt?: Date;
        uploading?: boolean;
        url?: string;
        userId?: string;
        path?: string;
        originalStore?: string;
        originalId?: string;
    }

    const DEFAULT_PICTURE_URL = 'assets/images/avatars/profile.jpg';

    interface POINT {
        coordinates: Array<number>;
        type?: string;
    }
    interface FOCLOCATION {
        loc?: POINT;
        title?: string;
        name?: string;
        buildingName?: string;
        imageId?: string;
        imageUrl?: string;
        state?: ADDR;
        country?: ADDR;
        city?: ADDR;
        premise?: ADDR;
        subStreet?: ADDR;
        street?: ADDR;
    }
    interface CREDITCARD {
        cardNumber: number;
        cardHolder: string;
        expiryDate: Date;
        type?: string;

    }
    interface QUESTION {
        adminKey: string;
        answer?: string;
        description?: string;
        customerDescription?: string;
        supplierDescription?: string;
        requiredCheck?: boolean;
        questionType?: string;
        options?: Array<Object>;
        enableCL?: boolean;
        conditions?: Array<Object>;
    }
    interface ValidationMessages {
        required: any;
    }
    interface PAGES {
        title?: string;
        questions: Array<QUESTION>;
    }
    interface FORM {
        _id: string;
        title: string;
        createdAt: Date;
        pages: Array<PAGES>;
        deleted?: boolean;
        folder?: string;
        owner?: string;
        updatedAt: Date;
        updater: string;
        serviceIds: Array<string>;

    }
    interface LEAD_VOUCHER {
        promotionId?: string;
        package?: PRICELIST;
        quantity?: number;
        usedQty?: number;
        tax?: number;
        delivery?: number;
        commission?: number;
        code?: string;
        paidTotal?: number;
        expiry?: Date;
        paymentSuccess?: boolean;
        vouchers: [{
            id?: string;
            used?: boolean;
            usedDate?: Date;
            status?: string;
            by?: string;
            phone?: string;
        }];
    }
    interface LEAD {
        _id?: string;
        title?: string;
        serviceId?: string;
        formId?: string;
        owner?: string;
        assignedTo?: {
            owner: string;
            quote: string;
            price: number;
            assignedDate: Date;
        };
        promotion?: LEAD_VOUCHER;
        source?: string;
        duplicate?: boolean;
        duplicateOf?: string;
        detail?: string;
        publish?: boolean;
        status?: string;
        folder?: string;
        location?: FOCLOCATION;
        createdAt?: Date;
        updatedAt?: Date;
        updatedBy?: Array<Object>;
        views?: number;
        images?: Array<SHORTIMAGE>;
        readBy?: Array<string>;
        quotedBy?: Array<string>;
        quotes?: Array<string>;
        shortList?: Array<string>;
        publisher?: string;
        bitlyUrl?: string;
        bitlyCustomerUrl?: string;
        pages?: Array<PAGES>;
        paymentSuccess?: boolean;
        numberSeenBy?: Array<string>;
    }


    interface QUOTE {
        _id?: string;
        quotedValue?: number;
        quoteMessage?: string;
        createdAt?: Date;
        deleted?: boolean;
        leadId?: string;
        leadTitle?: string;
        customer?: UserShortObject;
        shortListed?: boolean;
        status?: string;
        read: boolean;
        owner?: UserShortObject;
        updatedAt?: Date;
    }
    interface MESSAGE {
        _id?: string;
        threadId?: string;
        senderId?: string;
        recieverId?: string;
        text?: string;
        image?: any;
        quote?: QUOTE;
        location?: FOCLOCATION;
        mesgType?: string;
        createdAt?: Date;
    }
    interface THREAD {
        _id?: string;
        chatType?: string;
        picture?: any;
        messageCount?: number;
        lastMessage?: MESSAGE;
        members?: Array<CHATMEMBER>;
        memberIds?: Array<string>;
        job?: SHORTJOB;
        updatedAt?: Date;
        createdAt?: Date;
    }
    interface PRICELIST {
        title?: string;
        description?: string;
        originalPrice?: number;
        offerPrice?: number;
        discount?: number;
        pages?: Array<{
            questions: Array<QUESTION>,
        }>;
        default?: boolean;
        id?: string;
    }
    interface PROMOTION {
        _id?: string;
        address?: {
            locations: Array<FOCLOCATION>;
            locationUrl: string;
            locationImageId: string;
        };
        buyLimit?: number;
        category?: string;
        createdAt?: Date;
        updatedAt?: Date;
        detailDescription?: string;
        detailTitle?: string;
        description?: string;
        expiryVoucher?: Date;
        featured?: boolean;
        fbAd?: {
          title?: string;
          description?: string;
        };
        googleAd?: {
          displayNetwork?: boolean;
          search?: boolean;
          gpc?: string;
        };
        images?: Array<{
            id?: string;
            url?: string;
            caption?: string;
        }>;
        priceLists?: Array<PRICELIST>;
        published?: boolean;
        publishedBy?: string;
        relatedPromotions?: Array<string>;
        serviceId?: string;
        socialImages?: Array<{
            id?: string;
            url?: string;
            caption?: string;
        }>;
        shortTitle?: string;
        slug?: string;
        supplierId?: string;
        supplier?: {
            email?: string;
            number?: string;
        };
        terms?: string;
        title?: string;
        totalSales?: number;
        validFrom?: Date;
        validSales?: number;
        validTill?: Date;
        video?: {
            url?: string;
          videoType?: string;
          videoAdd?: boolean;
          image?: any;
        };
    }
    interface QUERYOPTIONS {
        limit?: number;
        sort?: any;
        skip?: number;
        filter?: any;
    }
    interface SETTING {
        _id?: string;
        userId?: string;
        notifications?: {
            email?: DeviceSetting;
            mobile?: DeviceSetting;
            desktop?: DeviceSetting;
        };
    }
    interface NOTIFICATION {
        _id?: string;
        type?: string;
        typeId?: string;
        for?: string;
        forId?: string;
        recipient?: string;
        recipientIds?: Array<string>;
        sender?: string;
        senderId?: string;
        senderName?: string;
        fixDepartment?: string;
        title?: string;
        body?: string;
        plain?: string;
        subject?: string;
        dpImageId?: string;
        active?: boolean;
        read?: boolean;
        updated?: boolean;
        isDeleted?: boolean;
        url?: string;
        createdAt?: Date;
        data?: {
            docId?: string;
            docCollection?: string;
            previous?: any;
            url?: string;
            doc?: NotificationDoc;
        };
        state?: {
            stateName?: string;
            stateParams?: {
                jobId?: string;
            }
        };
    }
}
