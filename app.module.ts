import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CustomerModule } from 'src/customer/customer.module'
import { ProducerModule } from 'src/producer/producer.module'

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'CUSTOMER_SERVICE',
                transport: Transport.KAFKA,
                options: {
                    client: {
                        brokers: ['localhost:9094'],
                    },
                    consumer: {
                        groupId: 'customer-group',
                    },
                },
            },
        ]),
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
        CustomerModule,
        ProducerModule,
    ],
})
export class AppModule {}
