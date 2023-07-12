import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersService } from '@users/services/users.service';
import { UsersController } from '@users/controllers/users.controller';
import { User, UserSchema } from '@users/schemas/user.schema';
import { PasswordService } from '@users/services/password.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UsersService, PasswordService],
  exports: [UsersService, PasswordService],
  controllers: [UsersController],
})
export class UsersModule {}
