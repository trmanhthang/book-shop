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
  id: number;

  @ManyToOne(() => User, (user: User) => user.orders, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'order_date' })
  oderDate: number = Date.now();

  @Column({ name: 'total_amount' })
  totalAmount: number;

  @Column({ name: 'status' })
  status: string;

  @OneToMany(() => OrderDetail, (orderDetail: OrderDetail) => orderDetail.order)
  orderDetails: OrderDetail[];
}
