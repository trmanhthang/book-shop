import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { OrderDetail } from '../order_details/orderDetail.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn({ name: 'id' })
  private id: number;

  @ManyToOne(() => User, (user: User) => user.orders, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'order_date' })
  private oderDate: number = Date.now();

  @Column({ name: 'total_amount' })
  private totalAmount: number;

  @Column({ name: 'status' })
  private status: string;

  @OneToMany(() => OrderDetail, (orderDetail: OrderDetail) => orderDetail.order)
  orderDetails: OrderDetail[];

  get getId(): number {
    return this.id;
  }

  set setId(value: number) {
    this.id = value;
  }

  get getOderDate(): number {
    return this.oderDate;
  }

  set setOderDate(value: number) {
    this.oderDate = value;
  }

  get getTotalAmount(): number {
    return this.totalAmount;
  }

  set setTotalAmount(value: number) {
    this.totalAmount = value;
  }

  get getStatus(): string {
    return this.status;
  }

  set setStatus(value: string) {
    this.status = value;
  }
}
