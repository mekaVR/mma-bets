import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from '@users/schemas/user.schema';
import { CreateUserDto } from '@users/dto/create-user.dto';
import { PasswordService } from '@users/services/password.service';
import { UpdateUserDto } from '@users/dto/update-user.dto';
import { userFormater } from '@users/formaters/user.formater';
import { UserInterface } from '@users/interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private passwordService: PasswordService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserInterface> {
    try {
      const { password } = createUserDto;
      createUserDto.password = await this.passwordService.encryptPassword(
        password,
      );
      const createdUser = new this.userModel(createUserDto);
      createdUser.save();
      return userFormater(createdUser);
    } catch (e) {
      console.log('ERROR:[CREATE_USER]', e);
    }
  }

  async findAll(): Promise<UserInterface[] | []> {
    try {
      const users = await this.userModel.find();
      return users.map((user) => userFormater(user));
    } catch (e) {
      console.log('ERROR:[FIND_ALL]', e);
    }
  }

  async findOne(id: string): Promise<UserInterface> {
    try {
      const user = await this.userModel.findById(id);
      return userFormater(user);
    } catch (e) {
      console.log('ERROR:[FIND_ONE]', e);
    }
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserInterface> {
    try {
      const userUpdate = await this.userModel.findByIdAndUpdate(
        id,
        updateUserDto,
        { new: true },
      );
      return userFormater(userUpdate);
    } catch (e) {
      console.log('ERROR:[UPDATE]', e);
    }
  }

  // TODO storage in bucket or local and return good url
  // for display avatar
  async updatePicture(id: string, updatePictureDto: any): Promise<any> {
    try {
      const { filename } = updatePictureDto;
      const userUpated = await this.userModel.findByIdAndUpdate(
        id,
        { picture: filename },
        { new: true },
      );
      return userFormater(userUpated);
    } catch (e) {
      console.log('ERROR:[UPLOAD_PICTURE]', e);
    }
  }

  async deleteUser(id: string) {
    try {
      return await this.userModel.findByIdAndDelete(id);
    } catch (e) {
      console.log('ERROR:[deleteUser]', e);
    }
  }
}
