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
  private id: number;

  @Column({ name: 'title' })
  private title: string;

  @Column({ name: 'image' })
  private image: string;

  @Column({ name: 'publication_date' })
  private publicationDate: string;

  @Column({ name: 'price' })
  private price: number;

  @Column({ name: 'quantity' })
  private quantity: number;

  @Column({ name: 'ISBN' })
  private ISBN: string;

  @ManyToMany(() => Genre, { cascade: true })
  @JoinTable({ name: 'book_genre' })
  private genres: Genre[];

  @ManyToOne(() => Author, (author: Author) => author.books, { cascade: true })
  author: Author;

  @OneToMany(() => Review, (review: Review) => review.book)
  reviews: Review[];

  @OneToMany(() => OrderDetail, (orderDetail: OrderDetail) => orderDetail.book)
  orderDetails: OrderDetail[];

  @OneToMany(() => CartDetail, (cartDetail: CartDetail) => cartDetail.book)
  cartDetails: CartDetail[];

  get getId(): number {
    return this.id;
  }

  set setId(value: number) {
    this.id = value;
  }

  get getImage(): string {
    return this.image;
  }

  set setImage(value: string) {
    this.image = value;
  }

  get getTitle(): string {
    return this.title;
  }

  set setTitle(value: string) {
    this.title = value;
  }

  get getPublicationDate(): string {
    return this.publicationDate;
  }

  set setPublicationDate(value: string) {
    this.publicationDate = value;
  }

  get getPrice(): number {
    return this.price;
  }

  set setPrice(value: number) {
    this.price = value;
  }

  get getQuantity(): number {
    return this.quantity;
  }

  set setQuantity(value: number) {
    this.quantity = value;
  }

  get getISBN(): string {
    return this.ISBN;
  }

  set setISBN(value: string) {
    this.ISBN = value;
  }

  get getGenre(): Genre[] {
    return this.genres;
  }

  set setGenre(value: Genre[]) {
    this.genres = value;
  }
}
