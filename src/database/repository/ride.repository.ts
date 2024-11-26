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
}