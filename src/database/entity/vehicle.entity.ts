import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column } from "typeorm"

@Entity({ name: "vehicles" })
export class Vehicle {
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

    @Column({ name: 'brand', type: 'varchar'})
    brand: string;

    @Column({ name: 'model', type: 'varchar'})
    model: string;

    @Column({ name: 'year', type: 'smallint'})
    year: string;

    @Column({ name: 'characteristics', type: 'varchar'})
    characteristics: string;

}
