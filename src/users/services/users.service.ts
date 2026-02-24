import { Injectable } from '@nestjs/common';

import { CreateUserDto } from '@users/dto/create-user.dto';
import { UpdateUserDto } from '@users/dto/update-user.dto';
import { UpdatePictureDto } from '@users/dto/update-picture.dto';
import { PasswordService } from '@users/services/password.service';
import { User } from '@users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private passwordService: PasswordService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { password } = createUserDto;
    createUserDto.password = await this.passwordService.encryptPassword(
      password,
    );

    return await this.userRepository.save({ ...createUserDto });
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({ email });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOneBy({ username });
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    return await this.findOne(id);
  }

  async updatePicture(
    id: number,
    updatePictureDto: UpdatePictureDto,
  ): Promise<User> {
    const { filename } = updatePictureDto;
    await this.userRepository.update(id, {
      picture: filename,
    });
    return await this.findOne(id);
  }

  async deleteUser(id: number) {
    return this.userRepository.delete(id);
  }
}
