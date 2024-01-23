import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from '../books/book.entity';

@Entity()
export class Author {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'fullName' })
  fullName: string;

  @Column({ name: 'address', nullable: true })
  address: string;

  @Column({ name: 'description', length: '1000' })
  description: string;

  @Column({ name: 'gender' })
  gender: string;

  @OneToMany(() => Book, (book) => book.author)
  books: Book[];
}
