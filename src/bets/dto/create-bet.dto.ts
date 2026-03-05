import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateBetPickDto } from './create-bet-pick.dto';

export class CreateBetDto {
  @IsNotEmpty()
  eventId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateBetPickDto)
  picks: CreateBetPickDto[];
}
