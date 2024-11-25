import { Request, Response } from "express";
import { rideEstimateValidator } from "./ride.validators";
import RideService from "./ride.service";

export default class RideController {
    private rideService = new RideService()

    constructor() {
        this.estimate = this.estimate.bind(this);
    }

    async estimate(req: Request, res: Response) {

        const { body } = req

        const result = rideEstimateValidator.safeParse(body)

        if(!result.success) {
            res.status(400).send({
                error_code: "INVALID_DATA",
                error_description: result.error.issues[0].message
            })

            return
        }

        if(result.data.destination === result.data.origin) {
            res.status(400).send({
                error_code: "INVALID_DATA",
                error_description: "Os endereços de origem e destino não podem ser o mesmo endereço"
            })

            return
        }

        const response = await this.rideService.estimate(result.data)

        // if (response.error_code) {

        // }

        // const routeResponse = await this?.routeApiService?.callComputeRoutes({
        //     origin: {
        //         address: 'R. Dr. Carneiro Ribeiro, 334 - PajuçaraNatal - RN, 59131-830'
        //     },
        //     destination: {
        //         address: 'Rua Monteiro Lobato - CandeláriaNatal - RN, 59065-060'
        //     }
        // })

        // if(this.routeApiService.isRouteApiError(routeResponse)) {
        //     res.status(routeResponse.status).send({
        //         error_code: "API_ERROR",
        //         error_description: routeResponse.message
        //        }
        //     )

        //     return
        // }



        res.send({ response: response })
        // res.send({ response: 'teste' })
    }
}