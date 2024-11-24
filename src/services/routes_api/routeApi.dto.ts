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