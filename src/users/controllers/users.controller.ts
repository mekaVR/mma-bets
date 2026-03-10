import {
  Body,
  Controller,
  Patch,
  Param,
  Get,
  Put,
  Delete,
  Request,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  ParseIntPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from '@users/services/users.service';
import { UpdateUserDto } from '@users/dto/update-user.dto';
import { storage } from '@users/utils/storage';
import { User } from '@users/entities/user.entity';
import { AuthenticatedRequest } from '@auth/interfaces/authenticated-request.interface';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('ranking')
  getRanking(): Promise<User[]> {
    return this.userService.getRanking();
  }

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Patch()
  updateProfile(
    @Request() req: AuthenticatedRequest,
    @Body() updateProfileDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(req.user.id, updateProfileDto);
  }

  @Put('picture')
  @UseInterceptors(FileInterceptor('avatar', storage))
  updatePicture(
    @Request() req: AuthenticatedRequest,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.userService.updatePicture(req.user.id, file);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete()
  deleteProfile(@Request() req: AuthenticatedRequest) {
    return this.userService.deleteUser(req.user.id);
  }
}
