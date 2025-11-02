import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TelegramModule } from './telegram/telegram.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      'mongodb://ismailovwd_db_user:TRJGTMrORRVkSzGH@cluster0.njwclrr.mongodb.net/?appName=Cluster0',
    ),
    UsersModule,
    AuthModule,
    TelegramModule,
    ProfileModule,
  ],
})
export class AppModule {}
