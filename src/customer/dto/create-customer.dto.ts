import { ApiProperty } from '@nestjs/swagger'

export class CreateAddressDto {
    @ApiProperty({ description: 'Rua do cliente' })
    street: string

    @ApiProperty({ description: 'Cidade do cliente' })
    city: string

    @ApiProperty({ description: 'Estado do cliente' })
    state: string

    @ApiProperty({ description: 'Código postal do cliente' })
    postalCode: string
}

export class CreateCustomerDto {
    @ApiProperty({ description: 'Nome do cliente' })
    name: string

    @ApiProperty({ description: 'Email do cliente' })
    email: string

    @ApiProperty({ description: 'dados de endereço do cliente', type: [CreateAddressDto] })
    addresses: CreateAddressDto[]
}
