import { Address } from '../entity/address.entity'

export class CustomerResponseDto {
    id: number
    name: string
    email: string
    addresses: Address[]
}
