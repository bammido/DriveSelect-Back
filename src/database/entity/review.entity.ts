import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, JoinColumn, ManyToOne, OneToOne } from "typeorm"
import { Driver } from "./driver.entity";
import { Customer } from "./customer.entity";

@Entity({ name: "reviews" })
export class Review {
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

    @Column({ name: 'rating', type: 'smallint'})
    rating: number;

    @Column({ name: 'comment', type: 'varchar'})
    comment: number;

    @Column({ name: 'driver_id', type: 'varchar'})
    driver_id: string;

    @Column({ name: 'customer_id', type: 'int'})
    customer_id: number;

    @ManyToOne(() => Driver, driver => driver.id)
    @JoinColumn({ name: 'driver_id' })
    driver: Driver;
    
    @ManyToOne(() => Customer, customer => customer.id)
    @JoinColumn({ name: 'customer_id' })
    customer: Customer;

}
