import {
  AfterInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Repository,
} from 'typeorm';
import { Role } from '../roles/role.entity';
import { Review } from '../reviews/review.entity';
import { Order } from '../orders/order.entity';
import { Cart } from '../carts/cart.entity';
import { Inject } from '@nestjs/common';

@Entity()
export class User {
  constructor(
    @Inject('CART_REPOSITORY')
    private readonly cartRepository: Repository<Cart>,
  ) {}

  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'username' })
  username: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'fullName' })
  fullName: string;

  @Column({
    default:
      'https://cdn.sforum.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg',
  })
  avatar: string;

  @Column({ default: true })
  status: boolean;

  @OneToOne(() => Cart, (cart: Cart) => cart.user, { cascade: true })
  @JoinColumn()
  cart: Cart;

  @ManyToOne(() => Role, (role: Role) => role.users, { cascade: true })
  role: Role;

  @OneToMany(() => Review, (review: Review) => review.user)
  reviews: Review[];

  @OneToMany(() => Order, (order: Order) => order.user)
  orders: Order[];

  @AfterInsert()
  async createCart() {
    const newCart = this.cartRepository.create();
    await this.cartRepository.save(newCart);

    this.cart = newCart;
    await this.cartRepository.save(newCart);
  }
}
