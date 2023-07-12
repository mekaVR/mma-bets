import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UsersService } from '@users/services/users.service';
import { PasswordService } from '@users/services/password.service';
import { User } from '@users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private passwordService: PasswordService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async generateJWT(username: string): Promise<{ access_token: string }> {
    return {
      access_token: await this.jwtService.signAsync({ username: username }),
    };
  }

  async signUp(createUserDto) {
    try {
      const { email, username } = createUserDto;
      const existingUser = await this.userModel.findOne({ email });

      if (existingUser) {
        return new BadRequestException('User already existing');
      }

      await this.usersService.createUser(createUserDto);
      return await this.generateJWT(username);
    } catch (e) {
      console.log('ERROR:[SIGN_UP]', e);
    }
  }

  async signIn(username: string, password: string) {
    try {
      const user = await this.usersService.findOne(username);
      const isValidPassword = await this.passwordService.isValidPassword(
        password,
        user?.password,
      );

      if (!isValidPassword) {
        throw new UnauthorizedException();
      }

      return await this.generateJWT(user.username);
    } catch (e) {
      console.log('ERROR:[SIGN_IN]', e);
    }
  }
}
