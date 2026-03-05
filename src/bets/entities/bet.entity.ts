import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { User } from '@users/entities/user.entity';
import { BetPick } from './bet-pick.entity';
import { BetStatus } from '../constants/bet.constants';

@Entity()
@Unique(['user', 'eventId'])
export class Bet {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @OneToMany(() => BetPick, (betPick) => betPick.bet)
  picks: BetPick[];

  @Column()
  eventId: string;

  @Column({
    default: 0,
  })
  totalPoints: number;

  @Column({
    type: 'enum',
    enum: BetStatus,
    default: BetStatus.PENDING,
  })
  status: BetStatus;

  @CreateDateColumn()
  createdAt: Date;
}
