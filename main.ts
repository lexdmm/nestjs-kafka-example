import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter())


    // Configuração do Kafka como Broker
    const kafkaOptions: MicroserviceOptions = {
        transport: Transport.KAFKA,
        options: {
            client: {
                clientId: 'customer',
                brokers: ['localhost:9094'],
                retry: {
                    initialRetryTime: 300,
                    retries: 3,
                },
            },
            consumer: {
                groupId: 'customer-group',
                sessionTimeout: 10000,
                heartbeatInterval: 2500,
            },
        },
    };

    // Inicializa o microserviço Kafka
    app.connectMicroservice(kafkaOptions);
    
    // Iniciar a aplicação e o microserviço Kafka
    await app.startAllMicroservices().then(() => {
        console.log('Kafka Consumer Service is listening...')
    })

    const config = new DocumentBuilder()
        .setTitle('Customer API')
        .setDescription('API para gerenciamento de clientes')
        .setVersion('1.0')
        .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api', app, document)

    await app.listen(3000, '0.0.0.0')
    console.log('Customer service is running on http://localhost:3000')
}

bootstrap()
