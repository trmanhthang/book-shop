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
      .leftJoinAndSelect('cart.user', 'user')
      .leftJoinAndSelect('cart.cartDetails', 'cart_details')
      .leftJoinAndSelect('cart_details.book', 'book')
      .leftJoinAndSelect('book.author', 'author')
      .select([
        'cart.id',
        'user.id',
        'cart_details.id',
        'cart_details.quantity',
        'cart_details.subtotal',
        'book.id',
        'book.title',
        'book.image',
        'author.id',
        'author.fullName',
      ])
      .where('user.id = :id', { id: id })
      .getOne();
  }
}
