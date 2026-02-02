import { Exclude, Expose, Transform } from 'class-transformer';

export class UserEntity {
  @Expose()
  @Transform(({ obj }) => obj._id?.toString())
  userId: string;

  @Expose()
  username: string;

  @Expose()
  email: string;

  @Exclude()
  password: string;

  @Expose()
  picture: string | null;

  @Expose()
  score: number;

  @Expose()
  rank: number;

  @Expose()
  badges: string[];

  @Expose()
  coinsBonus: number;

  @Exclude()
  admin: boolean;

  @Exclude()
  __v: number;

  @Exclude()
  _id: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
