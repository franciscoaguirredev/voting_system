import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Voter } from 'src/modules/voters/entities/voter.entity';
import { Candidate } from 'src/modules/candidates/entities/candidate.entity';

@Entity('votes')
export class Vote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  voter_id: string;

  @Column()
  candidate_id: string;

  @ManyToOne(() => Voter, voter => voter.votes)
  @JoinColumn({ name: 'voter_id' })
  voter: Voter;

  @ManyToOne(() => Candidate, candidate => candidate.votes)
  @JoinColumn({ name: 'candidate_id' })
  candidate: Candidate;

}
