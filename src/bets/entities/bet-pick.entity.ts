import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Bet } from './bet.entity';
import { BetStatus, Method } from '../constants/bet.constants';

@Entity()
export class BetPick {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Bet)
  bet: Bet;

  @Column()
  fightId: string;

  @Column()
  pick: number;

  @Column({
    type: 'enum',
    enum: Method,
    nullable: true,
  })
  method: Method | null;

  @Column({
    nullable: true,
  })
  round: number | null;

  @Column({
    default: 0,
  })
  points: number;

  @Column({
    type: 'enum',
    enum: BetStatus,
    default: BetStatus.PENDING,
  })
  status: BetStatus;
}
