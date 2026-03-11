import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from '@auth/auth.module';
import { UsersModule } from '@users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BetsModule } from '@bets/bets.module';
import { FightersModule } from '@fighters/fighters.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get<string>('DATABASE_URL'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    AuthModule,
    UsersModule,
    BetsModule,
    FightersModule,
  ],
})
export class AppModule {}
