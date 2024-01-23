import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Book } from '../books/book.entity';

@Entity()
export class Genre {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'genre_name' })
  genreName: string;

  @ManyToMany(() => Book, { cascade: true })
  @JoinTable({ name: 'book_genre' })
  books: Book[];
}
