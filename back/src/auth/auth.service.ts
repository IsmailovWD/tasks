import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { TelegramService } from '../telegram/telegram.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private telegramService: TelegramService,
  ) {}

  async validateUser(phone: string, pass: string) {
    const user = await this.usersService.findByPhone(phone);
    if (!user) return null;
    const match = await bcrypt.compare(pass, user.password);
    if (!match) return null;
    const { password, ...rest } = user.toObject();
    return rest;
  }

  async login(user: any) {
    const payload = { sub: user._id, phone: user.phone };
    return {
      access_token: this.jwtService.sign(payload),
      user: { _id: user._id, name: user.name, phone: user.phone },
    };
  }

  async registerAndLogin(createDto) {
    const user = await this.usersService.create(createDto);
    const msg = `New user registered\nName: ${user.name}\nPhone: ${user.phone}`;
    await this.telegramService.sendMessage(msg);

    const payload = { sub: (user as any)._id, phone: user.phone };
    const token = this.jwtService.sign(payload);
    return { token, user };
  }

  async localLogin(phone: string, password: string) {
    const valid = await this.validateUser(phone, password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');
    return this.login(valid);
  }
}
