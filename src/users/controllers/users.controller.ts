import {
  Body,
  Controller,
  Patch,
  Param,
  Get,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from '@users/services/users.service';
import { UpdateUserDto } from '@users/dto/update-user.dto';
import { storage } from '@users/utils/storage';
import { User } from '@users/entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  getUser(@Param('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }
  @Patch(':id')
  updateProfile(
    @Param('id') id: number,
    @Body() updateProfileDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, updateProfileDto);
  }

  @Put(':id/picture')
  @UseInterceptors(FileInterceptor('avatar', storage))
  updatePicture(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.userService.updatePicture(id, file);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteProfile(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }
}
