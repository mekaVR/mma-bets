import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '@auth/auth.module';
import { UsersModule } from '@users/users.module';
import { FightersModule } from '@fighters/fighters.module';
import { FightsModule } from '@fights/fights.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/mmaBet'),
    AuthModule,
    UsersModule,
    FightersModule,
    FightsModule,
  ],
})
export class AppModule {}
