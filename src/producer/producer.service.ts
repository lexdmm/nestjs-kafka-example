import { Injectable } from '@nestjs/common'
import { Kafka, Producer } from 'kafkajs'
import { CustomerResponseDto } from 'src/customer/dto/response-customer.dto'

@Injectable()
export class ProducerService {
    private kafkaProducer: Producer
    private kafka = new Kafka({
        clientId: 'customer',
        brokers: ['localhost:9094'],
        retry: {
            retries: 5,
            factor: 3,
        },
    })

    constructor() {
        this.kafkaProducer = this.kafka.producer()
    }

    async sendCustomerDataToKafka(customer: CustomerResponseDto) {
        try {
            await this.kafkaProducer.connect()

            const message = {
                value: JSON.stringify(customer),
                key: customer.id.toString(),
                topic: 'customer-topic',
                group: 'customer-group',
            }

            await this.kafkaProducer.send({
                topic: 'customer-topic',
                acks: 0,
                messages: [message],
            })

            await this.kafkaProducer.disconnect()
        } catch (error) {
            console.error('Error sending message to Kafka:', error)
        }
    }
}
