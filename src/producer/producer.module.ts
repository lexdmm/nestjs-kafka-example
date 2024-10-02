import { Module } from '@nestjs/common'
import { ProducerService } from './producer.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProducerController } from './producer.controller'
import { Customer } from 'src/customer/entity/customer.entity'
import { Address } from 'src/customer/entity/address.entity'

@Module({
    imports: [TypeOrmModule.forFeature([Customer, Address])],
    controllers: [ProducerController],
    providers: [ProducerService],
    exports: [ProducerService],
})
export class ProducerModule {}
