import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { Customer } from "./customer.entity";
import { Driver } from "./driver.entity";

@Entity({ name: "rides" })
export class Ride {
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

    @Column({ name: 'customer_id', type: 'varchar' })
    customer_id: string;

    @Column({ name: 'driver_id', type: 'int' })
    driver_id: number;

    @ManyToOne(() => Customer, customer => customer.id)
    @JoinColumn({ name: 'customer_id' })
    customer: Customer;

    @ManyToOne(() => Driver, driver => driver.id)
    @JoinColumn({ name: 'driver_id' })
    driver: Driver;
}
