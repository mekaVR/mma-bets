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
import { User, IUser } from '@users/interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private passwordService: PasswordService,
    @InjectModel('User') private userModel: Model<User>,
  ) {}

  async generateJWT(
    username: string,
    id: string,
  ): Promise<{ access_token: string }> {
    return {
      access_token: await this.jwtService.signAsync({
        username: username,
        id: id,
      }),
    };
  }

  async signUp(createUserDto) {
    try {
      const { email } = createUserDto;
      const existingUser = await this.userModel.findOne({ email });

      if (existingUser) {
        return new BadRequestException('User already existing');
      }

      const createdUser: IUser = await this.usersService.createUser(
        createUserDto,
      );
      return await this.generateJWT(createdUser.username, createdUser.userId);
    } catch (e) {
      console.log('ERROR:[SIGN_UP]', e);
    }
  }

  async signIn(username: string, password: string) {
    try {
      const user: IUser = await this.usersService.findOne(username);
      const isValidPassword: boolean =
        await this.passwordService.isValidPassword(password, user?.password);

      if (!isValidPassword) {
        throw new UnauthorizedException();
      }

      return await this.generateJWT(user.username, user.userId);
    } catch (e) {
      console.log('ERROR:[SIGN_IN]', e);
    }
  }
}
