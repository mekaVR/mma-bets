import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from '@auth/controllers/auth.controller';
import { AuthGuard } from '@auth/auth.guard';
import { AuthService } from '@auth/services/auth.service';
import { jwtConstants, TOKEN_EXPIRATION } from '@auth/constants/jwt.constants';
import { UsersModule } from '@users/users.module';
import { UserSchema } from '@users/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: TOKEN_EXPIRATION.DAYS },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
