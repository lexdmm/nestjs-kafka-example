import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Customer } from './customer.entity'

@Entity()
export class Address {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    street: string

    @Column()
    city: string

    @Column()
    state: string

    @Column()
    postalCode: string

    @ManyToOne(() => Customer, (customer) => customer.addresses)
    customer: Customer
}
