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
  private id: number;

  @Column({ name: 'genre_name' })
  private genreName: string;

  @ManyToMany(() => Book, { cascade: true })
  @JoinTable({ name: 'book_genre' })
  private books: Book[];

  get getId(): number {
    return this.id;
  }

  set setId(value: number) {
    this.id = value;
  }

  get getGenre(): string {
    return this.genreName;
  }

  set setGenre(value: string) {
    this.genreName = value;
  }

  get getBook(): Book[] {
    return this.books;
  }

  set setBook(value: Book[]) {
    this.books = value;
  }
}
