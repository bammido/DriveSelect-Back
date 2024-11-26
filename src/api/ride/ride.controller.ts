import { Request, Response } from "express";
import { rideConfirmValidator, rideEstimateValidator } from "./ride.validators";
import RideService from "./ride.service";

export default class RideController {
    private rideService = new RideService()

    constructor() {
        this.estimate = this.estimate.bind(this);
    }

    async estimate(req: Request, res: Response) {

       try {
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

            if(this.rideService.isRideServiceError(response)){
                res.send(response.status).send({
                    error_code: response.error_code,
                    error_description: response.error_description
                })

                return
            }

            res.send(response)
       } catch (error: any) {
            res.send(500).send({
                error_code: "SERVER_ERROR",
                error_description: error.message
            })
       }
    }

    async confirm(req: Request, res: Response) {
        try {
            const { body } = req

            const result = rideConfirmValidator.safeParse(body)

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

            const response = this.rideService.confirm(result.data)

            if(this.rideService.isRideServiceError(response)){
                res.send(response.status).send({
                    error_code: response.error_code,
                    error_description: response.error_description
                })

                return
            }

            res.send(response)
        } catch (error: any) {
            res.send(500).send({
                error_code: "SERVER_ERROR",
                error_description: error.message
            })
        }
    }
}