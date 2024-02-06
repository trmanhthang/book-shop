import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Cart } from '../../entity/carts/cart.entity';
import { User } from '../../entity/users/user.entity';

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
        'cart.total_amount',
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

  async findByIdAndUser(cart: Cart, user: User) {
    return this.cartRepository
      .createQueryBuilder('cart')
      .where('cart.id = :id', { id: cart.id })
      .leftJoinAndSelect('cart.user', 'user')
      .where('user.id = :id', { id: user.id })
      .getOne();
  }
  async getOneById(id: number) {
    return this.cartRepository
      .createQueryBuilder('cart')
      .leftJoinAndSelect('cart.user', 'user')
      .leftJoinAndSelect('cart.cartDetails', 'cart_details')
      .leftJoinAndSelect('cart_details.book', 'book')
      .leftJoinAndSelect('book.author', 'author')
      .select([
        'cart.id',
        'cart.total_amount',
        'cart_details.id',
        'cart_details.quantity',
        'cart_details.subtotal',
        'book.id',
        'book.title',
        'book.price',
        'book.quantity',
        'book.image',
        'author.id',
        'author.fullName',
      ])
      .getOne();
  }

  async sumTotal(idCart: number) {
    const cart = await this.cartRepository
      .createQueryBuilder('cart')
      .leftJoinAndSelect('cart.cartDetails', 'cart_details')
      .where('cart.id = :id', { id: idCart })
      .getOne();
    if (cart && cart.cartDetails) {
      cart.totalAmount = cart.cartDetails.reduce(
        (total, cartDetails) => total + cartDetails.subtotal,
        0,
      );
      await this.cartRepository.save(cart);
    }
  }
}
