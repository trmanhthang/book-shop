import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { CartDetail } from '../cart_details/cartDetail.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'total_amount', nullable: true })
  totalAmount: number;

  @OneToOne(() => User, (user: User) => user.cart)
  user: User;

  @OneToMany(() => CartDetail, (cartDetail: CartDetail) => cartDetail.cart)
  cartDetails: CartDetail[];
}
