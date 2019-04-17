import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './models/dto/create-user.dto';
import { AuthService } from 'src/shared/auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  checkAuth() {
    return { message: 'Route is pretected' };
  }
  @Post('login')
  async login(@Body() userDTO: UserDTO) {
    const user = await this.userService.login(userDTO);
    const payload = {
      email: user.email,
      username: user.username,
    };

    const token = await this.authService.signPayload(payload);
    return { user, token };
  }
  @Post('register')
  async register(@Body() userDTO: UserDTO) {
    const user = await this.userService.createUser(userDTO);
    const payload = {
      email: user.email,
      username: user.username,
    };
    const token = await this.authService.signPayload(payload);
    return { user, token };
  }
}
