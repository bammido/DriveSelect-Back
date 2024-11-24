export interface IcallComputeRoutesArgs {
    origin: Waypoint;
    destination: Waypoint;
}

interface ILatLang {
    latitude: number;
    longitude: number;
}

interface ILocation {
    latLng: ILatLang
}

type Waypoint = {
    location: ILocation
    address?: string;
} | {
    location?: ILocation
    address: string;
}

export interface IcallcomputeRoutesRes {
    routes: {
        legs: ILeg[]
    } 
}

interface ILeg {
    distanceMeters: number;
    duration: string;
    startLocation: ILocation;
    endLocation: ILocation;
}

export interface RouteApiError {
    status: number;
    message: string;
    error: boolean;
    originalMessage: string;
}