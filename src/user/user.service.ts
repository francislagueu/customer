import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './models/interface/user.interface';
import { UserDTO } from './models/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}
  //   private async sanitizeUser(user: User): Promise<User> {
  //     await user.depopulate('password');
  //     return user;
  //   }

  async createUser(userDTO: UserDTO): Promise<User> {
    const { username } = userDTO;
    const user = await this.userModel.findOne({ username });
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const newUser = await this.userModel.create(userDTO);
    await newUser.save();
    await newUser.depopulate('password');
    return newUser;
  }

  async login(userDTO: Partial<UserDTO>): Promise<User> {
    const { email, username, password } = userDTO;
    const user = await this.userModel.findOne({ username });
    if (!user) {
      throw new NotFoundException('User does not exists');
    }
    if (await bcrypt.compare(password, user.password)) {
      await user.depopulate('password');
      return user;
    } else {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
  }

  async findByPayload(payload: any) {
    const { username } = payload;
    return await this.userModel.findOne({ username });
  }
}
