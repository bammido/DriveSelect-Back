import { Request, Response } from "express";
import RouteApiService from "../../services/routes_api/routeApi.service";

export default class RideController {
    private routeApiService = new RouteApiService();

    constructor() {
        this.calculateRide = this.calculateRide.bind(this);
    }

    async calculateRide(req: Request, res: Response) {
        
        res.status(400).send({
            error_code: "INVALID_DATA",
            error_description: "Os dados fornecidos no corpo da requisição são inválidos"
           }
        )

        const routeResponse = await this?.routeApiService?.callComputeRoutes({
            origin: {
                address: 'R. Dr. Carneiro Ribeiro, 334 - PajuçaraNatal - RN, 59131-830'
            },
            destination: {
                address: 'Rua Monteiro Lobato - CandeláriaNatal - RN, 59065-060'
            }
        })

        if(this.routeApiService.isRouteApiError(routeResponse)) {
            res.status(routeResponse.status).send({
                error_code: "API_ERROR",
                error_description: routeResponse.message
               }
            )
        }

        res.send({ response: routeResponse })
    }
}