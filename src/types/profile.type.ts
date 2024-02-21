export interface IProfile {
    [x: string]: any;
    _id?: string
    name: string
    localisation?: UserLocalisation;
    contact?: UserContact;
    deviantWalletId?: string;
    image?: string
    role?: number,
    profileType?: string
    administratedProfiles?: Array<string>
    followers?: Array<string>
    following?: Array<string>
    publications?: Array<string>
    description?: string
    categories?: string
    isFollowed?: boolean
    conversations?: Array<number>

};

type UserLocalisation = {
    address: {
        isPublic: boolean;
        value: string;
    }
    coordonates: {
        isPublic: boolean;
        latitude: number;
        longitude: number;
    }
    country: {
        isPublic: boolean;
        value: string;
    }
}

type UserContact = {
    email: string;
    phone: string;
    website: string;
}

export type ProfileFilter = {
    image: string
    isFollowed: boolean
    localisation: UserLocalisation
    name: string
    numberOfFollowers: number
    profileType: string
    _id: string
}
