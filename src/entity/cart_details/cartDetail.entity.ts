import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cart } from '../carts/cart.entity';
import { Book } from '../books/book.entity';

@Entity()
export class CartDetail {
  @PrimaryGeneratedColumn()
  private id: number;

  @OneToOne(() => Cart, (cart: Cart) => cart.cartDetail)
  @JoinColumn()
  cart: Cart;

  @ManyToOne(() => Book, (book: Book) => book.cartDetails, { cascade: true })
  @JoinColumn({ name: 'book_id' })
  book: Book;

  @Column()
  private quantity: number;

  @Column()
  private subtotal: number;

  get getId() {
    return this.id;
  }

  get getQuantity() {
    return this.quantity;
  }

  set setQuantity(value: number) {
    this.quantity = value;
  }

  get getSubtotal() {
    return this.subtotal;
  }

  set setSubtotal(value: number) {
    this.subtotal = value;
  }
}
