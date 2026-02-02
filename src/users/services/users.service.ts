import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserDto } from '@users/dto/create-user.dto';
import { PasswordService } from '@users/services/password.service';
import { UpdateUserDto } from '@users/dto/update-user.dto';
import { userFormater } from '@users/formaters/user.formater';
import { User, IUser } from '@users/interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private passwordService: PasswordService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<IUser> {
    const { password } = createUserDto;
    createUserDto.password = await this.passwordService.encryptPassword(
      password,
    );
    const createdUser = new this.userModel(createUserDto);
    await createdUser.save();
    return userFormater(createdUser);
  }

  async findAll(): Promise<IUser[]> {
    const users = await this.userModel.find();
    return users.map((user) => userFormater(user));
  }

  async findOne(id: string): Promise<IUser> {
    const user = await this.userModel.findById(id);
    return userFormater(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email });
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<IUser> {
    const userUpdate = await this.userModel.findByIdAndUpdate(
      id,
      updateUserDto,
      { new: true },
    );
    return userFormater(userUpdate);
  }

  async updatePicture(id: string, updatePictureDto: any): Promise<IUser> {
    const { filename } = updatePictureDto;
    const userUpdated = await this.userModel.findByIdAndUpdate(
      id,
      { picture: filename },
      { new: true },
    );
    return userFormater(userUpdated);
  }

  async deleteUser(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
