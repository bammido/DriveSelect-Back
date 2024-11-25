import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, OneToMany, OneToOne, JoinColumn } from "typeorm"
import { Review } from "./review.entity";
import { Vehicle } from "./vehicle.entity";
import { Ride } from "./ride.entity";

@Entity({ name: "drivers" })
export class Driver {
    @PrimaryGeneratedColumn('increment')
    id: number

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    })
    public created_at: Date;

    @UpdateDateColumn({
        name: 'updated_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    })
    public updated_at: Date;

    @Column({name: 'name', type: 'varchar'})
    name: string;

    @Column({name: 'description', type: 'varchar'})
    description: string;
    
    @Column({name: 'vehicle_id', type: 'int'})
    vehicle_id: number;
    
    @Column({name: 'value', type: 'float'})
    value: number;
    
    @Column({name: 'min_km', type: 'float'})
    min_km: number;

    @OneToMany(() => Review, (review) => review.driver_id)
    reviews: Review[];
    
    @OneToMany(() => Ride, (ride) => ride.driver_id)
    rides: Ride[];

    @OneToOne(() => Vehicle, vehicle => vehicle.id)
    @JoinColumn({ name: 'vehicle_id' })
    vehicle: Vehicle;
}
