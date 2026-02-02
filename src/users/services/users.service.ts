import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserDto } from '@users/dto/create-user.dto';
import { UpdateUserDto } from '@users/dto/update-user.dto';
import { UpdatePictureDto } from '@users/dto/update-picture.dto';
import { PasswordService } from '@users/services/password.service';
import { UserEntity } from '@users/entities/user.entity';
import { User } from '@users/interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private passwordService: PasswordService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { password } = createUserDto;
    createUserDto.password = await this.passwordService.encryptPassword(
      password,
    );
    const createdUser = new this.userModel(createUserDto);
    await createdUser.save();
    return new UserEntity(createdUser.toObject());
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.userModel.find();
    return users.map((user) => new UserEntity(user.toObject()));
  }

  async findOne(id: string): Promise<UserEntity> {
    const user = await this.userModel.findById(id);
    return new UserEntity(user.toObject());
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email });
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const userUpdate = await this.userModel.findByIdAndUpdate(
      id,
      updateUserDto,
      { new: true },
    );
    return new UserEntity(userUpdate.toObject());
  }

  async updatePicture(
    id: string,
    updatePictureDto: UpdatePictureDto,
  ): Promise<UserEntity> {
    const { filename } = updatePictureDto;
    const userUpdated = await this.userModel.findByIdAndUpdate(
      id,
      { picture: filename },
      { new: true },
    );
    return new UserEntity(userUpdated.toObject());
  }

  async deleteUser(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
