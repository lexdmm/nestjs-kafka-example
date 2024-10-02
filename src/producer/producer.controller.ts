import { Controller, Get } from '@nestjs/common'
import { ProducerService } from './producer.service'

@Controller('producer')
export class ProducerController {
    constructor(private readonly producerService: ProducerService) {}

    @Get('send-customers')
    async sendCustomerData() {
        await this.producerService.sendCustomerDataToKafka()
        return 'Customers data sent to Kafka!'
    }
}
