import { Controller, Get, Post, Body } from '@nestjs/common'
import { CustomerService } from './customer.service'
import { CreateCustomerDto } from './dto/create-customer.dto'
import { CustomerResponseDto } from './dto/response-customer.dto'

@Controller('customers')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) {}

    @Post()
    async create(@Body() createCustomerDto: CreateCustomerDto): Promise<CustomerResponseDto> {
        return this.customerService.create(createCustomerDto)
    }

    @Get()
    async findAll(): Promise<CustomerResponseDto[]> {
        return this.customerService.findAll()
    }
}
