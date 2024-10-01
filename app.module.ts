import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CustomerModule } from 'src/customer/customer.module'
import { ProducerModule } from 'src/producer/producer.module'

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'postgres',
            database: 'customer_db',
            autoLoadEntities: true,
            synchronize: true,
        }),
        ProducerModule,
        CustomerModule,
    ],
})
export class AppModule {}
