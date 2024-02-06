import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { CartDetailService } from './cart-detail.service';
import { DatabaseModule } from '../../config/database/database.module';
import { cartDetailProvider } from '../../entity/cart_details/cartDetail.provider';
import { cartProviders } from '../../entity/carts/cart.provider';
import { BookModule } from "../book/book.module";

@Module({
  imports: [DatabaseModule, BookModule],
  controllers: [CartController],
  providers: [
    ...cartProviders,
    ...cartDetailProvider,
    CartService,
    CartDetailService,
  ],
  exports: [CartService, CartDetailService],
})
export class CartModule {}
