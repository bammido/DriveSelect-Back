import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTables1732505747373 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'customers',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()'
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()',
                }
            ]
        }))

        await queryRunner.createTable(new Table({
            name: 'vehicles',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    generationStrategy: "increment"
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()'
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()',
                },
                {
                    name: 'brand',
                    type: 'varchar'
                },
                {
                    name: 'model',
                    type: 'varchar'
                },
                {
                    name: 'characteristics',
                    type: 'varchar'
                },
                {
                    name: 'year',
                    type: 'smallint',
                    isNullable: true
                },

            ]
        }))
        
        await queryRunner.createTable(new Table({
            name: 'drivers',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    generationStrategy: "increment"
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()'
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()',
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'description',
                    type: 'varchar'
                },
                {
                    name: 'vehicle_id',
                    type: 'int',
                    isNullable: true
                },
                {
                    name: 'value',
                    type: 'float',
                },
                {
                    name: 'min_km',
                    type: 'float',
                },
            ]
        }))

        await queryRunner.createForeignKey(
            "drivers",
            new TableForeignKey({
                columnNames: ["vehicle_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "vehicles",
            }),
        )

        await queryRunner.createTable(new Table({
            name: 'reviews',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    generationStrategy: "increment"
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()'
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()',
                },
                {
                    name: 'rating',
                    type: 'smallint',
                },
                {
                    name: 'comment',
                    type: 'varchar',
                },
                {
                    name: 'driver_id',
                    type: 'int',
                },
                {
                    name: 'customer_id',
                    type: 'varchar',
                },
            ]
        }))

        await queryRunner.createForeignKey(
            "reviews",
            new TableForeignKey({
                columnNames: ["driver_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "drivers",
            }),
        )
        
        await queryRunner.createForeignKey(
            "reviews",
            new TableForeignKey({
                columnNames: ["customer_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "customers",
            }),
        )

        await queryRunner.createTable(new Table({
            name: 'rides',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    generationStrategy: "increment"
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()'
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()',
                },
                {
                    name: 'customer_id',
                    type: 'varchar',
                },
                {
                    name: 'driver_id',
                    type: 'int',
                },
            ]
        }))

        await queryRunner.createForeignKey(
            "rides",
            new TableForeignKey({
                columnNames: ["driver_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "drivers",
            }),
        )
        
        await queryRunner.createForeignKey(
            "rides",
            new TableForeignKey({
                columnNames: ["customer_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "customers",
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("reviews")
        await queryRunner.dropTable("rides")
        await queryRunner.dropTable("drivers")
        await queryRunner.dropTable("customers")
        await queryRunner.dropTable("vehicles")
    }

}
