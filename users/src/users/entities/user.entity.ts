import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    cnp: string;

    @Column()
    passwd: string;

    @DeleteDateColumn()
    deletedAt?: Date;

    @Column({ default: 'user' })
    role: string;
}
