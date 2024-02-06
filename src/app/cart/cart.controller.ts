import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CartDetailService } from './cart-detail.service';
import { SaveCartDto } from '../../dto/cart.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticationGuard } from '../../guards/authentication.guard';

@Controller('cart')
export class CartController {
  constructor(
    private readonly cartService: CartService,
    private readonly cartDetailService: CartDetailService,
  ) {}

  @UseGuards(AuthenticationGuard)
  @Post('save')
  async addToCart(@Body() data: SaveCartDto, @Res() res) {
    const value = await this.cartDetailService.save(data);
    if (value) {
      res.status(HttpStatus.OK).json(value);
    } else {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Đã có lỗi xảy ra!',
      });
    }
  }

  @UseGuards(AuthenticationGuard)
  @Get(':id')
  async getOne(@Param('id') id: number, @Res() res) {
    const cart = await this.cartService.getOneById(id);
    res.json(cart);
  }
}
