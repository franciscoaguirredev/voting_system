import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Vote } from 'src/modules/votes/entities/vote.entity';

@Entity('candidates')
export class Candidate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  party: string;

  @OneToMany(() => Vote, vote => vote.candidate)
  votes: Vote[];
}
