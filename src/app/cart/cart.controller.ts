import { Controller, Get, Param } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartDetailService } from './cart-detail.service';

@Controller('cart')
export class CartController {
  constructor(
    private readonly cartService: CartService,
    private readonly cartDetailService: CartDetailService,
  ) {}

  @Get('get_one/:id')
  async getOne(@Param('id') id: number) {
    return await this.cartService.getOneByUser(id);
  }
}
