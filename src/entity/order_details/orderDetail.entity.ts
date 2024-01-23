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
  id: number;

  @ManyToOne(() => Order, (order: Order) => order.orderDetails, {
    cascade: true,
  })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => Book, (book: Book) => book.orderDetails, { cascade: true })
  @JoinColumn({ name: 'book_id' })
  book: Book;

  @Column({ name: 'quantity' })
  quantity: number;

  @Column({ name: 'subtotal' })
  subtotal: number;
}
