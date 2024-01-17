import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from '../orders/order.entity';
import { Book } from '../books/book.entity';

@Entity()
export class OrderDetail {
  @PrimaryGeneratedColumn({ name: 'id' })
  private id: number;

  @ManyToOne(() => Order)
  @JoinColumn({ name: 'order_id' })
  private orders: Order[];

  @ManyToOne(() => Book)
  @JoinColumn({ name: 'book_id' })
  private book: Book;

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

  get getOrders(): Order[] {
    return this.orders;
  }

  set setOrders(value: Order[]) {
    this.orders = value;
  }

  get getBook(): Book {
    return this.book;
  }

  set setBook(value: Book) {
    this.book = value;
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
