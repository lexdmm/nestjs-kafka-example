import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateCustomerDto } from './dto/create-customer.dto'
import { Customer } from './entity/customer.entity'

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>,
    ) {}

    async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
        const customer = this.customerRepository.create(createCustomerDto)
        return await this.customerRepository.save(customer)
    }

    async findAll(): Promise<Customer[]> {
        return await this.customerRepository.find({ relations: ['addresses'] })
    }
}
