import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Cart } from '../../entity/carts/cart.entity';

@Injectable()
export class CartService {
  constructor(
    @Inject('CART_REPOSITORY')
    private readonly cartRepository: Repository<Cart>,
  ) {}

  async getOneByUser(id: number) {
    return await this.cartRepository
      .createQueryBuilder('cart')
      .leftJoinAndSelect('cart.user = :user', 'user')
      .where('cart.user_id = :id', { id: id })
      .getOne();
  }
}
