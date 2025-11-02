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
      'mongodb+srv://ismailovwd_db_user:8wzJqhmYFs6tbsb4@cluster0.jkzlec8.mongodb.net/?appName=Cluster0&retryWrites=true&w=majority',
      {
        retryWrites: true,
        w: 'majority',
      },
    ),
    UsersModule,
    AuthModule,
    TelegramModule,
    ProfileModule,
  ],
})
export class AppModule {}
