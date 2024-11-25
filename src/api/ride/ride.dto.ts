export interface IRideServiceCalculateRouteArgs {
    customer_id: string;
    origin: string;
    destination: string;
}

export interface IRideServiceCalculateRouteRes {
    origin: {
        latitude: number
        longitude: number
    };
    destination: {
        latitude: number
        longitude: number
    };
    distance: number;
    duration: string;
    options: IDriverOption[];
    routeResponse: any;
}

interface IDriverOption {
    id: number;
    name: string;
    description: string;
    vehicle: string;
    review: {
        rating: number
        comment: string
    };
    value: number;
}

export interface IRideServiceError {
    error_code: string;
    error_description: string;
}