import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from '@users/schemas/user.schema';
import { CreateUserDto } from '@users/dto/create-user.dto';
import { PasswordService } from '@users/services/password.service';

//export type User = UserInterface;
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private passwordService: PasswordService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { password } = createUserDto;
      createUserDto.password = await this.passwordService.encryptPassword(
        password,
      );
      const createdUser = new this.userModel(createUserDto);
      return createdUser.save();
    } catch (e) {
      console.log('ERROR:[CREATE_USER]', e);
    }
  }

  async findOne(username: string): Promise<User | undefined> {
    try {
      return await this.userModel.findOne({ username });
    } catch (e) {
      console.log('ERROR:[FIND_ONE]', e);
    }
  }
}
