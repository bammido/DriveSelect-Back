import { AppDataSource } from "../../dataSource"
import { Ride } from "../entity/ride.entity"


export class RideRepository {
    private rideRepository = AppDataSource.getRepository(Ride)

    async save(newRide: {
        destination: string;
        origin: string;
        driver_id: number;
        customer_id: string;
        distance: number;
        duration: string;
        value: number;
    }) {
        return await this.rideRepository.save(newRide)
    }

    async getRides( whereOptions: {
        customer_id: string;
        driver_id?: number;
    }) {
        return await this.rideRepository.find({ 
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

    async getCustomerDrivers({customer_id }: { customer_id: string }) {
        return await this.rideRepository
            .query(`
                SELECT DISTINCT d.id, d.name
                FROM rides r
                JOIN drivers d ON r.driver_id = d.id
                WHERE r.customer_id = '${customer_id}';
            `)
    }
}