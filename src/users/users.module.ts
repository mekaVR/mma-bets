import { Module } from '@nestjs/common';

import { UsersService } from '@users/services/users.service';
import { UsersController } from '@users/controllers/users.controller';
import { PasswordService } from '@users/services/password.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, PasswordService],
  exports: [UsersService, PasswordService],
  controllers: [UsersController],
})
export class UsersModule {}
