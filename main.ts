import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
//import { MicroserviceOptions, Transport } from '@nestjs/microservices'

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter())

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
