import { AppDataSource } from "../../dataSource"
import { Customer } from "../entity/customer.entity"

export class CustomerRepository { 
    private customerRepository = AppDataSource.getRepository(Customer)

    async create({ customer_id }: { customer_id: string}) {
       return await this.customerRepository.save({
            id: customer_id
       })
    }
}