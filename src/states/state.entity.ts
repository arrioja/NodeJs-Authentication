/**
 *  Esta entidad define a los estados disponibles para la app.
 */

import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Country } from '../countries/country.entity';
import { City } from '../cities/city.entity';
import { IsNotEmpty } from 'class-validator';

@Injectable()
@Entity()
export class State extends BaseEntity {

    // ATTRIBUTES ---------------------------------------------------------------------------------------
    @PrimaryGeneratedColumn()
    id: number;

    // Nombre del país
    @IsNotEmpty()
    @Column({ length: 200 })
    name: string;

    @IsNotEmpty()
    @Column()
    countryId: number;

    // RELATIONS ---------------------------------------------------------------------------------------
    @IsNotEmpty()
    @ManyToOne(type => Country, country => country.id)
    country: Country;

    @OneToMany(type => City, cities => cities.state)
    cities: City[];

    // COMMON COLUMNS ---------------------------------------------------------------------------------
    @IsNotEmpty()
    @Column({ default: true })
    status: boolean; // 1 = Active, 0 = Inactive

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;

}
