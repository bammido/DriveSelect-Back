import { AppDataSource } from "../../dataSource"
import { Driver } from "../entity/driver.entity"
import { LessThanOrEqual } from "typeorm"

class DriverRepository { 
    private driverRepository = AppDataSource.getRepository(Driver)

    async estimateDriversPrice({ distanceMeters }: { distanceMeters: number}) {
        const distanceKm = distanceMeters / 1000

        const drivers= await this.driverRepository.find({
            relations: { reviews: true, vehicle: true },
            where: {
                min_km: LessThanOrEqual(distanceKm)
            }
        })
        
        const driversCalculated = drivers.map(driver => ({ 
            id: driver.id,
            name: driver.name,
            description: driver.description,
            vehicle: `${driver.vehicle.brand} ${driver.vehicle.model} ${driver.vehicle.year?? ''} ${driver.vehicle.characteristics}`,
            value: Math.round((distanceKm * driver.value) * 100) / 100, 
            review: {
                rating: driver.reviews[0]?.rating,
                comment: driver.reviews[0]?.comment
            }
        }))

        return driversCalculated;
    }
}

export default new DriverRepository()