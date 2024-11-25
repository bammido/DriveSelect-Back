import RouteApiService from "../../services/routes_api/routeApi.service";
import { IRideServiceCalculateRouteArgs, IRideServiceCalculateRouteRes, IRideServiceError } from "./ride.dto"

export default class RideService {
    private routeApiService = new RouteApiService()

    constructor() {
        this.estimate = this.estimate.bind(this)
    }

    async estimate({destination, origin}: IRideServiceCalculateRouteArgs): Promise<IRideServiceCalculateRouteRes | IRideServiceError> {
        const routeResponse = await this?.routeApiService?.callComputeRoutes({
            origin: {
                address: origin
            },
            destination: {
                address: destination
            }
        })

        if(this.routeApiService.isRouteApiError(routeResponse)) {
            return {
                error_code: "API_ERROR",
                error_description: routeResponse.message
            }
        }

        const routeLeg = routeResponse.routes[0].legs[0]

        const response = {
            origin: {
                latitude: routeLeg.startLocation.latLng.latitude,
                longitude: routeLeg.startLocation.latLng.longitude
            },
            destination: {
                latitude: routeLeg.endLocation.latLng.latitude,
                longitude: routeLeg.endLocation.latLng.longitude
            },
            distance: routeLeg.distanceMeters,
            duration: routeLeg.duration,
            options: [],
            routeResponse
        }

        return response
    }
}