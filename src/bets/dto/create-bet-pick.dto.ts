import { IsNotEmpty, IsOptional } from 'class-validator';
import { Method } from '../constants/bet.constants';

export class CreateBetPickDto {
  @IsNotEmpty()
  fightId: string;

  @IsNotEmpty()
  pick: number;

  @IsOptional()
  method?: Method;

  @IsOptional()
  round?: number;
}
