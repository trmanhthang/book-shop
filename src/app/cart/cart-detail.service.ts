import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CartDetail } from '../../entity/cart_details/cartDetail.entity';
import { CartService } from './cart.service';
import { SaveCartDto } from '../../dto/cart.dto';
import { BookService } from '../book/book.service';
import { Cart } from '../../entity/carts/cart.entity';
import { Book } from '../../entity/books/book.entity';

@Injectable()
export class CartDetailService {
  constructor(
    @Inject('CART_DETAIL_REPOSITORY')
    private readonly cartDetailRepository: Repository<CartDetail>,
    private readonly cartService: CartService,
    private readonly bookService: BookService,
  ) {}

  async save(data: SaveCartDto) {
    const cart = await this.cartService.findByIdAndUser(data.cart, data.user);
    const cartItem = await this.checkCartItem(data.cart, data.book);
    const book = await this.bookService.findById(data.book.id);

    if (cart) {
      if (data.cartDetails.quantity <= book.quantity) {
        if (cartItem) {
          cartItem.quantity += data.cartDetails.quantity;
          cartItem.subtotal = book.price * cartItem.quantity;

          await this.cartDetailRepository.save(cartItem);
          await this.cartService.sumTotal(data.cart.id);
          return {
            cart: await this.cartService.getOneById(data.cart.id),
            book: await this.bookService.getOne(data.book.id),
            message: 'Thêm vào giỏ hàng thành công!',
          };
        } else {
          const cartDetails = {
            quantity: data.cartDetails.quantity,
            subtotal: data.cartDetails.quantity * book.price,
            book: {
              id: data.book.id,
            },
            cart: {
              id: data.cart.id,
            },
          };
          await this.cartDetailRepository.save(cartDetails);
          await this.cartService.sumTotal(data.cart.id);
          return {
            cart: await this.cartService.getOneById(data.cart.id),
            book: await this.bookService.getOne(data.book.id),
            message: 'Thêm vào giỏ hàng thành công!',
          };
        }
      } else {
        return {
          cart: await this.cartService.getOneById(data.cart.id),
          book: await this.bookService.getOne(data.book.id),
          message: 'Đã hết hàng!',
        };
      }
    } else {
      return false;
    }
  }

  async checkCartItem(cart: Cart, book: Book) {
    return await this.cartDetailRepository
      .createQueryBuilder('cart_details')
      .leftJoinAndSelect('cart_details.cart', 'cart')
      .where('cart.id = :id', { id: cart.id })
      .leftJoinAndSelect('cart_details.book', 'book')
      .where('book.id = :id', { id: book.id })
      .getOne();
  }
}
