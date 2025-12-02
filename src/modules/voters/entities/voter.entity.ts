import { Exclude } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('voters')
export class Voter {
  @PrimaryGeneratedColumn('uuid')  
  id: string;

  @Column('varchar', {
    length: 150,
    nullable: false,
    name: 'name',
  })
  name: string;

  @Column({ unique: true, nullable:false, name:'email' })  
  email: string;

  @Column('varchar', { length: 105, select: false, nullable: false })
  @Exclude()
  password: string;

  @Column({ default: false })
  has_voted: boolean;  
}