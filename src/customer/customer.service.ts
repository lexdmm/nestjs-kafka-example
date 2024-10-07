import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateCustomerDto } from './dto/create-customer.dto'
import { Customer } from './entity/customer.entity'
import { ProducerService } from 'src/producer/producer.service'
import { CustomerResponseDto } from './dto/response-customer.dto'

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>,
        private readonly producerService: ProducerService,
    ) {}

    async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
        try {
            const customer: CustomerResponseDto = this.customerRepository.create(createCustomerDto)
            const savedCustomer = await this.customerRepository.save(customer)

            // Envia os dados do cliente para o Kafka
            if (savedCustomer) {
                await this.producerService.sendCustomerDataToKafka(customer)
            }
            return savedCustomer
        } catch (error) {
            new BadRequestException(error)
        }
    }

    async findAll(): Promise<Customer[]> {
        return await this.customerRepository.find({ relations: ['addresses'] })
    }
}
