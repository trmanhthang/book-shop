import { IsNotEmpty } from 'class-validator';
import { CartDetail } from '../entity/cart_details/cartDetail.entity';
import { User } from '../entity/users/user.entity';
import { Cart } from '../entity/carts/cart.entity';
import { Book } from '../entity/books/book.entity';

export class SaveCartDto {
  @IsNotEmpty()
  cartDetails: CartDetail;

  @IsNotEmpty()
  cart: Cart;

  @IsNotEmpty()
  user: User;

  @IsNotEmpty()
  book: Book;
}
