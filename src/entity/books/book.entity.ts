import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Genre } from '../genres/genre.entity';
import { Author } from '../authors/author.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn({ name: 'id' })
  private id: number;

  @Column({ name: 'title' })
  private title: string;

  @Column({ name: 'publication_date' })
  private publicationDate: Date;

  @Column({ name: 'price' })
  private price: number;

  @Column({ name: 'quantity' })
  private quantity: number;

  @Column({ name: 'ISBN' })
  private ISBN: string;

  @ManyToOne(() => Genre)
  @JoinColumn({ name: 'genre_id' })
  private genre: Genre;

  @ManyToOne(() => Author)
  @JoinColumn({ name: 'author_id' })
  private author: Author;

  get getId(): number {
    return this.id;
  }

  set setId(value: number) {
    this.id = value;
  }

  get getTitle(): string {
    return this.title;
  }

  set setTitle(value: string) {
    this.title = value;
  }

  get getPublicationDate(): Date {
    return this.publicationDate;
  }

  set setPublicationDate(value: Date) {
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

  get getGenre(): Genre {
    return this.genre;
  }

  set setGenre(value: Genre) {
    this.genre = value;
  }

  get getAuthor(): Author {
    return this.author;
  }

  set setAuthor(value: Author) {
    this.author = value;
  }
}
