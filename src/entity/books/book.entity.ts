import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Genre } from '../genres/genre.entity';
import { Author } from '../authors/author.entity';
import { Review } from '../reviews/review.entity';
import { OrderDetail } from '../order_details/orderDetail.entity';
import { CartDetail } from '../cart_details/cartDetail.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'image' })
  image: string;

  @Column({ name: 'publication_date' })
  publicationDate: string;

  @Column({ name: 'price' })
  price: number;

  @Column({ name: 'quantity' })
  quantity: number;

  @Column({ name: 'ISBN' })
  ISBN: string;

  @ManyToMany(() => Genre, { cascade: true })
  @JoinTable({ name: 'book_genre' })
  genres: Genre[];

  @ManyToOne(() => Author, (author: Author) => author.books, { cascade: true })
  author: Author;

  @OneToMany(() => Review, (review: Review) => review.book)
  reviews: Review[];

  @OneToMany(() => OrderDetail, (orderDetail: OrderDetail) => orderDetail.book)
  orderDetails: OrderDetail[];

  @OneToMany(() => CartDetail, (cartDetail: CartDetail) => cartDetail.book)
  cartDetails: CartDetail[];
}
