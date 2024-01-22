import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { CartDetail } from '../cart_details/cartDetail.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  private id: number;

  @Column({ name: 'total_amount' })
  private totalAmount: number;

  @OneToOne(() => User, (user: User) => user.cart)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne(() => CartDetail, (cartDetail: CartDetail) => cartDetail.cart, {
    cascade: true,
  })
  @JoinColumn({ name: 'cart-detail_id' })
  cartDetail: CartDetail;

  get getId() {
    return this.id;
  }

  get getTotalAmount() {
    return this.totalAmount;
  }

  set setTotalAmount(value: number) {
    this.totalAmount = value;
  }
}
