import { Entity, CreateDateColumn, UpdateDateColumn, OneToMany, PrimaryColumn } from "typeorm"
import { Review } from "./review.entity";
import { Ride } from "./ride.entity";

@Entity({ name: "customers" })
export class Customer {
    @PrimaryColumn({ name: 'id','type': 'varchar'})
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

    @OneToMany(() => Review, (review) => review.customer)
    reviews: Review[];

    @OneToMany(() => Ride, (ride) => ride.customer)
    rides: Ride[];
}
