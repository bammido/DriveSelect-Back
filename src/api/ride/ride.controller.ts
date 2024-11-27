import { Request, Response } from "express";
import { getRideValidator, rideConfirmValidator, rideEstimateValidator } from "./ride.validators";
import RideService from "./ride.service";

export default class RideController {
    private rideService = new RideService()

    constructor() {
        this.estimate = this.estimate.bind(this);
        this.confirm = this.confirm.bind(this);
        this.getRide = this.getRide.bind(this);
        this.getCustomerDrivers = this.getCustomerDrivers.bind(this);
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
            res.status(500).send({
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

            const response = await this.rideService.confirm(result.data)

            if(this.rideService.isRideServiceError(response)){
                res.send(response.status).send({
                    error_code: response.error_code,
                    error_description: response.error_description
                })

                return
            }

            res.send(response)
        } catch (error: any) {
            res.status(500).send({
                error_code: "SERVER_ERROR",
                error_description: error.message
            })
        }
    }

    async getCustomerDrivers(req: Request, res: Response) {
        const { params } = req

        const { customer_id } = params

        const drivers = await this.rideService.getCustomerDrivers({ customer_id })

        res.send({ drivers })
    }

    async getRide(req: Request, res: Response) {
        try {
            const { params, query } = req

            const { customer_id } = params

            const { driver_id } = query

            const result = getRideValidator.safeParse({
                customer_id,
                driver_id: driver_id ? Number(driver_id) : null
            })

            if(!result.success) {
                res.status(400).send({
                    error_code: "INVALID_DATA",
                    error_description: result.error.issues[0].message
                })

                return
            }

            const rides = await this.rideService.getRides({
                customer_id,
                driver_id: driver_id? Number(driver_id) : undefined
            })

            res.send(rides)
        } catch (error: any) {
            res.status(500).send({
                error_code: "SERVER_ERROR",
                error_description: error.message
            })
        }
    }
}