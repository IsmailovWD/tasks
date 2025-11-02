import { Body, Controller, Get, Put, Req, UseGuards } from '@nestjs/common';
import { JwtCookieAuthGuard } from '../auth/jwt-cookie.guard';
import { UsersService } from '../users/users.service';
import { UpdateUserDto } from '../users/dto/update-user.dto';

@Controller('profile')
@UseGuards(JwtCookieAuthGuard)
export class ProfileController {
  constructor(private usersService: UsersService) {}

  @Get()
  async me(@Req() req) {
    const userId = req.user.userId;
    console.log(userId);
    return this.usersService.findById(userId);
  }

  @Put()
  async update(@Req() req, @Body() dto: UpdateUserDto) {
    const userId = req.user.userId;
    return this.usersService.update(userId, dto);
  }
}
