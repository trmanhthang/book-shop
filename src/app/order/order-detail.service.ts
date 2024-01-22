import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { OrderDetail } from '../../entity/order_details/orderDetail.entity';

@Injectable()
export class OrderDetailService {
  constructor(
    @Inject('ORDER_DETAIL_REPOSITORY')
    private readonly oderDetailRepository: Repository<OrderDetail>,
  ) {}
}
