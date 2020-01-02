/**
 *  This entity defines the cities
 */
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { State } from '../states/state.entity';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class City extends BaseEntity {

    // ATTRIBUTES ---------------------------------------------------------------------------------------
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column({ length: 200 })
    name: string;

    @IsNotEmpty()
    @Column()
    stateId: number;

    // RELATIONS ---------------------------------------------------------------------------------------
    @ManyToOne(type => State, state => state.id)
    state: State;

    // COMMON COLUMNS ---------------------------------------------------------------------------------
    @IsNotEmpty()
    @Column({ default: true })
    status: boolean; // 1 = Active, 0 = Inactive

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;

}
