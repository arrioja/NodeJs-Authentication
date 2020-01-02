/**
 *  La entidad crea la estructura de la tabla que será usada por el motor de Node para crear o modificar la tabla
 *  directamente en el motor de base de datos si la opción de sincronizar está en True... (Ver carpeta config)
 *  Esta entidad define a los paises disponibles para la app.
 */

import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { State } from '../states/state.entity';
import { IsNotEmpty } from 'class-validator';

@Injectable()
@Entity()
export class Country extends BaseEntity {

    // ATTRIBUTES ---------------------------------------------------------------------------------------
    @PrimaryGeneratedColumn()
    id: number;

    // Country Identification Code: CO, VE. ES, EU
    @IsNotEmpty()
    @Column({ length: 2, unique: true })
    alpha2code: string;

    // código telefónico: +1 +58 +57, etc
    @IsNotEmpty()
    @Column({ length: 5, unique: true })
    callingCodes: string;

    @IsNotEmpty()
    @Column({ length: 150 })
    name: string;

    // RELATIONS ---------------------------------------------------------------------------------------

    @OneToMany(type => State, states => states.country)
    states: State[];

    // COMMON COLUMNS ---------------------------------------------------------------------------------
    @IsNotEmpty()
    @Column({ default: true })
    status: boolean; // 1 = Active, 0 = Inactive

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;
}
