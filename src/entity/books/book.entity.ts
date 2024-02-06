import {
  AfterInsert,
  AfterUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Repository,
} from 'typeorm';
import { Genre } from '../genres/genre.entity';
import { Author } from '../authors/author.entity';
import { Review } from '../reviews/review.entity';
import { OrderDetail } from '../order_details/orderDetail.entity';
import { CartDetail } from '../cart_details/cartDetail.entity';
import slugify from 'slugify';
import { Inject } from '@nestjs/common';

@Entity()
export class Book {
  constructor(
    @Inject('BOOK_REPOSITORY')
    private readonly bookRepository: Repository<Book>,
  ) {}

  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'image' })
  image: string;

  @Column({ name: 'publication_date' })
  publicationDate: string;

  @Column({ name: 'slug' })
  slug: string;

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
