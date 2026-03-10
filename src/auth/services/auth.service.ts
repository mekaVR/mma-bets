import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '@users/services/users.service';
import { PasswordService } from '@users/services/password.service';
import { CreateUserDto } from '@users/dto/create-user.dto';
import { User } from '@users/entities/user.entity';
import { ERROR_MESSAGES } from '../../constants/error-messages.constant';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private passwordService: PasswordService,
  ) {}

  async generateJWT(
    username: string,
    id: number,
  ): Promise<{ access_token: string }> {
    return {
      access_token: await this.jwtService.signAsync({
        username: username,
        id: id,
      }),
    };
  }

  async signUp(createUserDto: CreateUserDto) {
    const { email, username } = createUserDto;

    const existingEmail = await this.usersService.findByEmail(email);
    if (existingEmail) {
      throw new ConflictException(ERROR_MESSAGES.DUPLICATE_EMAIL);
    }

    const existingUsername = await this.usersService.findByUsername(username);
    if (existingUsername) {
      throw new ConflictException(ERROR_MESSAGES.DUPLICATE_USERNAME);
    }

    const createdUser: User = await this.usersService.createUser(createUserDto);
    return this.generateJWT(createdUser.username, createdUser.id);
  }

  async signIn(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException(ERROR_MESSAGES.INVALID_CREDENTIALS);
    }

    const isValidPassword = await this.passwordService.isValidPassword(
      password,
      user.password,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException(ERROR_MESSAGES.INVALID_CREDENTIALS);
    }

    return this.generateJWT(user.username, user.id);
  }
}
