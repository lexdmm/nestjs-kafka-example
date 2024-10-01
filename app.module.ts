import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CustomerModule } from 'src/customer.module'

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
        CustomerModule,
    ],
})
export class AppModule {}
