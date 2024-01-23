import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cart } from '../carts/cart.entity';
import { Book } from '../books/book.entity';

@Entity()
export class CartDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cart, (cart: Cart) => cart.cartDetails, { cascade: true })
  @JoinColumn()
  cart: Cart;

  @ManyToOne(() => Book, (book: Book) => book.cartDetails, { cascade: true })
  @JoinColumn()
  book: Book;

  @Column()
  quantity: number;

  @Column()
  subtotal: number;
}
