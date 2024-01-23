import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLogin, UserRegisterDto } from '../../dto/user.dto';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() userRegister: UserRegisterDto, @Res() res) {
    const flag = await this.authService.registerUser(userRegister);

    if (!flag) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ status: 400, message: 'Email đã tồn tại!' });
    } else {
      res.status(HttpStatus.OK).json({
        statusCode: 200,
        message: 'Đăng ký tài khoản thành công!',
      });
    }
  }

  @Post('login')
  async login(@Body() userLogin: UserLogin, @Res() res) {
    const data = await this.authService.login(userLogin);
    if (data) {
      res.cookie('token', data.token, {
        httpOnly: true,
        maxAge: 20 * 60 * 60 * 1000,
      });
      res.status(HttpStatus.OK).json({
        user: {
          id: data.user.id,
          username: data.user.username,
          avatar: data.user.avatar,
          cart: data.user.cart,
        },
        message: 'Đăng nhập thành công!',
      });
    } else {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Sai email hoặc mật khẩu',
      });
    }
  }

  //
  @Post('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('oauth2google')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: Request) {
    return req.user;
  }
}
