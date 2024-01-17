import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLogin, UserRegisterDto } from '../../dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() userRegister: UserRegisterDto, @Res() res: any) {
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
  async login(@Body() userLogin: UserLogin, @Res() res: any) {
    const token = await this.authService.login(userLogin);
    if (token) {
      res.cookie('token', token, {
        httpOnly: true,
        maxAge: 20 * 60 * 60 * 1000,
      });
      res.status(HttpStatus.OK).json({
        message: 'Đăng nhập thành công!',
      });
    } else {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Sai email hoặc mật khẩu',
      });
    }
  }
}
