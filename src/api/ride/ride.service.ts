import { DriverRepository } from "../../database/repository/driver.repository";
import { RideRepository } from "../../database/repository/ride.repository";
import RouteApiService from "../../services/routes_api/routeApi.service";
import { IRideServiceCalculateRouteArgs, IRideServiceCalculateRouteRes, IRideServiceConfirmArgs, IRideServiceConfirmRes, IRideServiceError } from "./ride.dto"

export default class RideService {
    private routeApiService = new RouteApiService();
    private driverRepository = new DriverRepository();
    private rideRepository = new RideRepository()

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
                error: true,
                error_code: "API_ERROR",
                error_description: routeResponse.message,
                status: 400
            }
        }

        const routeLeg = routeResponse.routes[0].legs[0]

        const options = await this.driverRepository.estimateDriversPrice({ distanceMeters: routeLeg.distanceMeters }) 

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
            options,
            routeResponse
        }

        return response
    }

    async confirm(ride: IRideServiceConfirmArgs): Promise<IRideServiceConfirmRes | IRideServiceError>{
        const driver = await this.driverRepository.findDriver({ id: ride.driver.id })

        if(!driver) {
            return {
                error: true,
                error_code: "DRIVER_NOT_FOUND",
                error_description: "Motorista não encontrado",
                status: 404
            }
        }

        if(driver.min_km > ride.distance) {
            return {
                error: true,
                error_code: "INVALID_DISTANCE",
                error_description: "Quilometragem inválida para o motorista",
                status: 406
            }
        }

        await this.rideRepository.save({
            customer_id: ride.customer_id,
            destination: ride.destination,
            origin: ride.origin,
            distance: ride.distance,
            driver_id: ride.driver.id,
            duration: ride.duration,
            value: ride.value
        })

        return { 
            success: true
         }
    }

    async getRides({
        customer_id,
        driver_id
    }: {
        customer_id: string;
        driver_id?: number;
    }) {
        const rides =  driver_id ? await this.rideRepository.getRides({ customer_id, driver_id }) : await this.rideRepository.getRides({ customer_id })

        if(!rides.length) {
            return {
                error: true,
                error_code: "NO_RIDES_FOUND",
                error_description: "Nenhum registro encontrado",
                status: 404
            }
        }

        return {
            customer_id,
            rides: rides.map(ride => ({...ride, driver: {
                id: ride.driver.id,
                name: ride.driver.name
            }}))
        }
    }

    isRideServiceError(response: any | IRideServiceError): response is IRideServiceError {
        return (response as IRideServiceError).error === true;
    }
}