/**
 *  This defines the type of the identification document registered, for example: Passport-3434q3434
 * o CC-343434343434
 */

import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class IdType extends BaseEntity {

    // ATTRIBUTES ---------------------------------------------------------------------------------------
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column({ length: 150 })
    name: string;

    @IsNotEmpty()
    @Column({unique: true, length: 5 })
    cod: string;

    // COMMON COLUMNS ---------------------------------------------------------------------------------
    @IsNotEmpty()
    @Column({ default: true })
    status: boolean; // 1 = Active, 0 = Inactive

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;

}
