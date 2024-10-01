import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Kafka, Producer } from 'kafkajs'
import { Customer } from 'src/customer/entity/customer.entity'
import { Repository } from 'typeorm'

@Injectable()
export class ProducerService {
    private kafkaProducer: Producer

    constructor(
        @InjectRepository(Customer)
        private customerRepository: Repository<Customer>,
        private readonly kafka: Kafka,
    ) {
        this.kafkaProducer = this.kafka.producer()
    }

    async sendCustomerDataToKafka() {
        try {
            await this.kafkaProducer.connect()

            const customers = await this.customerRepository.find()

            for (const customer of customers) {
                const message = {
                    value: JSON.stringify(customer),
                    key: customer.id.toString(),
                    topic: 'customer-topic',
                    group: 'customer-group',
                }

                await this.kafkaProducer.send({
                    topic: 'customer-topic',
                    acks: -1,
                    messages: [message],
                })
            }

            await this.kafkaProducer.disconnect()
        } catch (error) {
            console.error('Error sending message to Kafka:', error)
        }
    }
}
