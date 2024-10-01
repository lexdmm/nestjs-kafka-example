export class CreateAddressDto {
    street: string
    city: string
    state: string
    postalCode: string
}

export class CreateCustomerDto {
    name: string
    email: string
    addresses: CreateAddressDto[]
}
