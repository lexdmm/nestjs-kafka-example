import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CustomerService } from './customer.service'
import { CustomerController } from './customer.controller'
import { Customer } from './entity/customer.entity'
import { Address } from './entity/address.entity'
import { ProducerService } from 'src/producer/producer.service'

@Module({
    imports: [TypeOrmModule.forFeature([Customer, Address])],
    controllers: [CustomerController],
    providers: [CustomerService, ProducerService],
})
export class CustomerModule {}
