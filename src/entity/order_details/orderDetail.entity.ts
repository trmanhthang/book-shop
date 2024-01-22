import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from '../orders/order.entity';
import { Book } from '../books/book.entity';

@Entity()
export class OrderDetail {
  @PrimaryGeneratedColumn({ name: 'id' })
  private id: number;

  @ManyToOne(() => Order, (order: Order) => order.orderDetails, {
    cascade: true,
  })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => Book, (book: Book) => book.orderDetails, { cascade: true })
  @JoinColumn({ name: 'book_id' })
  book: Book;

  @Column({ name: 'quantity' })
  private quantity: number;

  @Column({ name: 'subtotal' })
  private subtotal: number;

  get getId(): number {
    return this.id;
  }

  set setId(value: number) {
    this.id = value;
  }

  get getQuantity(): number {
    return this.quantity;
  }

  set setQuantity(value: number) {
    this.quantity = value;
  }

  get getSubtotal(): number {
    return this.subtotal;
  }

  set setSubtotal(value: number) {
    this.subtotal = value;
  }
}
