import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Book } from '../books/book.entity';
import { User } from '../users/user.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @ManyToOne(() => Book, (book: Book) => book.reviews, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({ name: 'book_id' })
  book: Book;

  @ManyToOne(() => User, (user: User) => user.reviews, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'comment' })
  comment: string;

  @Column({ name: 'date_post' })
  datePost: string;
}
