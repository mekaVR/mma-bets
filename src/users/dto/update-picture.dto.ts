import { IsNotEmpty } from 'class-validator';
// TODO re-write this dto
export class UpdatePictureDto {
  @IsNotEmpty()
  file: string;
}
