import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class VotingOption {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    category: string;

    // @Column()
    // expireAt: Date;

    // @Column()
    // deletedAt: Date;
}
