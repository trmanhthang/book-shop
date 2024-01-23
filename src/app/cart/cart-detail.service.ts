import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CartDetail } from '../../entity/cart_details/cartDetail.entity';

@Injectable()
export class CartDetailService {
  constructor(
    @Inject('CART_DETAIL_REPOSITORY')
    private readonly cartDetailRepository: Repository<CartDetail>,
  ) {}
}
