import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Book } from '../books/book.entity';
import { User } from '../users/user.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn({ name: 'id' })
  private id: number;

  @ManyToOne(() => Book)
  private book: Book;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  private user: User;

  @Column({ name: 'rating' })
  private rating: number;

  @Column({ name: 'comment' })
  private comment: string;

  @Column({ name: 'date_post' })
  private datePost: number = Date.now();

  get getId(): number {
    return this.id;
  }

  set setId(value: number) {
    this.id = value;
  }

  get getBook(): Book {
    return this.book;
  }

  set setBook(value: Book) {
    this.book = value;
  }

  get getUser(): User {
    return this.user;
  }

  set setUser(value: User) {
    this.user = value;
  }

  get getRating(): number {
    return this.rating;
  }

  set setRating(value: number) {
    this.rating = value;
  }

  get getComment(): string {
    return this.comment;
  }

  set setComment(value: string) {
    this.comment = value;
  }

  get getDatePost(): number {
    return this.datePost;
  }

  set setDatePost(value: number) {
    this.datePost = value;
  }
}
