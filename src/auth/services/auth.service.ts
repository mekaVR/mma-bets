import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UsersService } from '@users/services/users.service';
import { PasswordService } from '@users/services/password.service';
import { CreateUserDto } from '@users/dto/create-user.dto';
import { UserEntity } from '@users/entities/user.entity';
import { User } from '@users/interfaces/user.interface';

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

  async signUp(createUserDto: CreateUserDto) {
    const { email, username } = createUserDto;

    const existingEmail = await this.userModel.findOne({ email });
    if (existingEmail) {
      throw new ConflictException('Un utilisateur avec cet email existe déjà');
    }

    const existingUsername = await this.userModel.findOne({ username });
    if (existingUsername) {
      throw new ConflictException("Ce nom d'utilisateur est déjà pris");
    }

    const createdUser: UserEntity = await this.usersService.createUser(
      createUserDto,
    );
    return this.generateJWT(createdUser.username, createdUser.userId);
  }

  async signIn(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }

    const isValidPassword = await this.passwordService.isValidPassword(
      password,
      user.password,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }

    return this.generateJWT(user.username, user._id.toString());
  }
}
