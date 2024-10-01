import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CustomerService } from './customer.service'
import { CustomerController } from './customer.controller'
import { Customer } from './entity/customer.entity'
import { Address } from './entity/address.entity'

@Module({
    imports: [TypeOrmModule.forFeature([Customer, Address])],
    controllers: [CustomerController],
    providers: [CustomerService],
})
export class CustomerModule {}
