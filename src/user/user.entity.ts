import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn,
         UpdateDateColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { IsNotEmpty, MinLength, IsString, IsEmail, MaxLength } from 'class-validator';
import { RolesAllowed } from '../roles.obfuscation';

@Entity()
@Unique(['username']) // This expects an array of columns in the table that should be unique, it will make sure o it.
export class User extends BaseEntity {

    // ATTRIBUTES ---------------------------------------------------------------------------------------
    @PrimaryGeneratedColumn() id: number;

    @IsNotEmpty()
    @MinLength(5, { always: true })
    @MaxLength(25, { always: true })
    @IsString({ always: true })
    @Column({ type: 'varchar', length: 255, nullable: false})
    username: string;

    @Column()
    @IsEmail()
    email: string;

    @Column( { default: 1 } )
    userReferredBy: number;

    @Column()
    password: string; // la contraseña

    @Column()
    salt: string;

    @Column({ default: RolesAllowed.NORMAL_USER })
    roles: string;

    async validatePassword(password: string): Promise <boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }

    // COMMON COLUMNS ---------------------------------------------------------------------------------
    @IsNotEmpty()
    @Column({ default: true })
    status: boolean; // 1 = Active, 0 = Inactive

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;

}
