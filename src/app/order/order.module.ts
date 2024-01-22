import { Module } from '@nestjs/common';
import { orderProviders } from '../../entity/orders/order.providers';
import { orderDetailProvider } from '../../entity/order_details/orderDetail.provider';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderDetailService } from './order-detail.service';
import { DatabaseModule } from '../../config/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [OrderController],
  providers: [
    ...orderProviders,
    ...orderDetailProvider,
    OrderService,
    OrderDetailService,
  ],
  exports: [OrderService, OrderDetailService],
})
export class OrderModule {}
