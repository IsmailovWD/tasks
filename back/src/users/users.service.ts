import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const exists = await this.userModel.findOne({ phone: createDto.phone });
    if (exists) throw new ConflictException('Phone already registered');

    const hashed = await bcrypt.hash(createDto.password, 10);
    const created = new this.userModel({ ...createDto, password: hashed });
    const saved = await created.save();
    const { password, ...rest } = saved.toObject();
    return rest;
  }

  async findByPhone(phone: string) {
    return this.userModel.findOne({ phone }).exec();
  }

  async findById(id: string) {
    const user = await this.userModel.findById(id).select('-password').exec();
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: string, dto: UpdateUserDto) {
    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }
    const updated = await this.userModel
      .findByIdAndUpdate(id, dto, { new: true })
      .select('-password')
      .exec();
    if (!updated) throw new NotFoundException('User not found');
    return updated;
  }
}
