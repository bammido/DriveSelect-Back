import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class PopulateTables1732505747383 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO customers (id)
                    VALUES 
                        ('Alice');
        `)
    
        await queryRunner.query(`
             INSERT INTO vehicles (id, brand, model, characteristics, year)
                    VALUES 
                        (1,'Plymouth', 'Valiant', 'rosa e enferrujado', 1973),
                        (2,'Dodge', 'Charger', 'modificado', 1970),
                        (3,'Aston', 'Martin DB5', 'clássico', null);
        `)
        
        await queryRunner.query(`
              INSERT INTO drivers (id, name, description, vehicle_id, value, min_km)
                    VALUES 
                        (1,'Homer Simpson', 'Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).', 1, 2.50, 1),
                        (2,'Dominic Toretto', 'Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.', 2, 5, 5),
                        (3,'James Bond', 'Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.', 3, 10, 10);
        `)

        await queryRunner.query(`           
                insert into reviews (id, rating, comment, driver_id, customer_id)
                    values
                        (1, 2, 'Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.', 1, 'Alice'),
                        (2, 4, 'Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!', 2, 'Alice'),
                        (3, 5, 'Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto.', 3, 'Alice');
            `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
                delete from reviews;
                delete from rides;
                delete from drivers;
                delete from vehicles;
                delete from customers;
            `);
    }

}
