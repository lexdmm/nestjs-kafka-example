import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Address } from './address.entity'

@Entity()
export class Customer {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    email: string

    @OneToMany(() => Address, (address) => address.customer, { cascade: true })
    addresses: Address[]
}
