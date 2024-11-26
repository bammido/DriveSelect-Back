import { AppDataSource } from "../../dataSource"
import { Ride } from "../entity/ride.entity"


export class RideRepository {
    private driverRepository = AppDataSource.getRepository(Ride)

    async save(newRide: {
        destination: string;
        origin: string;
        driver_id: number;
        customer_id: string;
        distance: number;
        duration: string;
        value: number;
    }) {
        return await this.driverRepository.save(newRide)
    }

    async getRides( whereOptions: {
        customer_id: string;
        driver_id?: number;
    }) {
        return await this.driverRepository.find({ 
            where: whereOptions,
            order: {
                created_at: {
                    direction: "DESC"
                }
            },
            select: ["driver", "destination", "distance", "duration", "origin", "value", "id", "date"],
            relations: { driver: true}
        })
    }
}