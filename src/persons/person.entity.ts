/**
 *  This defines a person, this completes the user information
 */

import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn,
         CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Country } from '../countries/country.entity';
import { State } from '../states/state.entity';
import { City } from '../cities/city.entity';
import { IdType } from '../idtypes/idtype.entity';
import { IsNotEmpty, IsEmail } from 'class-validator';
import { User } from '../user/user.entity';

@Entity()
export class Person extends BaseEntity {

    // ATTRIBUTES ---------------------------------------------------------------------------------------
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column({ length: 200 })
    name: string;

    @IsNotEmpty()
    @Column({ length: 200 })
    lastName: string;

    // ID document number
    @IsNotEmpty()
    @Column({ length: 50 })
    idNumber: string;

    @IsNotEmpty()
    @Column()
    birthDate: Date;

    @IsNotEmpty()
    @Column({length: 250, default: 'defaultimage.png'})
    urlImage: string;

    @IsNotEmpty()
    @Column()
    fullAddress: string;

    @IsEmail()
    @IsNotEmpty()
    @Column({unique: true})
    email1: string;

    @Column()
    @IsEmail()
    email2: string;

    @IsNotEmpty()
    @Column()
    phone1: string;

    @Column()
    phone2: string;

    @Column( { default: 1 } )
    userReferredBy: number;

    // RELATIONS ---------------------------------------------------------------------------------------
    @IsNotEmpty()
    @ManyToOne(type => Country, country => country.id)
    country: Country;

    @IsNotEmpty()
    @ManyToOne(type => Country, country => country.id)
    nationality: Country;

    @IsNotEmpty()
    @ManyToOne(type => State, state => state.id)
    state: State;

    @IsNotEmpty()
    @ManyToOne(type => City, city => city.id)
    city: City;

    @IsNotEmpty()
    @ManyToOne(type => IdType, idType => idType.id)
    idType: IdType;

    @IsNotEmpty()
    @OneToOne(type => User)
    @JoinColumn()
    user: User;

    // COMMON COLUMNS ---------------------------------------------------------------------------------
    @IsNotEmpty()
    @Column({ default: true })
    status: boolean; // 1 = Active, 0 = Inactive

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;

}
