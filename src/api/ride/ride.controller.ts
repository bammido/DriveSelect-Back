import { Request, Response } from "express";
import { rideEstimateValidator } from "./ride.validators";
import RideService from "./ride.service";
import driverRepository from "../../database/repository/driver.repository";

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

        res.send({ response: response })
    }

    async teste(req: Request, res: Response) {
        const drivers = await driverRepository.estimateDriversPrice({ distanceMeters: 16910 })

        res.send({response: drivers})
    }
}