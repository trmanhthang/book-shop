import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Order } from '../../entity/orders/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @Inject('ORDER_REPOSITORY')
    private readonly orderRepository: Repository<Order>,
  ) {}
}
