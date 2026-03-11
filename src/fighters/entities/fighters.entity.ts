import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Fighter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    nullable: true,
  })
  nickname: string | null;

  @Column()
  height: number;

  @Column()
  weight: number;

  @Column()
  reach: number;

  @Column({
    nullable: true,
  })
  stance: string | null;

  @Column({
    nullable: true,
  })
  dateOfBirth: Date | null;

  @Column()
  wins: number;

  @Column()
  losses: number;

  @Column()
  draws: number;

  @Column()
  winsByKo: number;

  @Column()
  winsBySub: number;

  @Column()
  winsByDec: number;

  @Column({
    nullable: true,
  })
  strikingAccuracy: number | null;

  @Column({
    nullable: true,
  })
  takedownAccuracy: number | null;

  @Column({
    nullable: true,
  })
  strikingDefense: number | null;

  @Column({
    nullable: true,
  })
  takedownDefense: number | null;

  @Column({
    nullable: true,
  })
  picture: string | null;
}
