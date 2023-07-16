import { IsEmail, IsNotEmpty } from 'class-validator';
export class UpdateUserDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
