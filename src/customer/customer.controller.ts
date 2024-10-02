import { Controller, Get, Post, Body } from '@nestjs/common'
import { CustomerService } from './customer.service'
import { CreateCustomerDto } from './dto/create-customer.dto'
import { CustomerResponseDto } from './dto/response-customer.dto'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('customers')
@Controller('customers')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) {}

    @Post()
    @ApiOperation({ summary: 'Criar novo cliente' })
    @ApiResponse({ status: 201, description: 'Cliente criado com sucesso.' })
    @ApiResponse({ status: 400, description: 'Dados inválidos.' })
    async create(@Body() createCustomerDto: CreateCustomerDto): Promise<CustomerResponseDto> {
        return this.customerService.create(createCustomerDto)
    }

    @Get()
    @ApiOperation({ summary: 'Listar todos os clientes' })
    @ApiResponse({ status: 200, description: 'Lista de clientes.' })
    async findAll(): Promise<CustomerResponseDto[]> {
        return this.customerService.findAll()
    }
}
