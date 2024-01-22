import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Book } from '../../entity/books/book.entity';
import { BookDto } from '../../dto/book.dto';

@Injectable()
export class BookService {
  constructor(
    @Inject('BOOK_REPOSITORY')
    private readonly bookRepository: Repository<Book>,
  ) {}

  async getAllBook(): Promise<Book[]> {
    const listBook = await this.bookRepository
      .createQueryBuilder('book')
      .leftJoinAndSelect('book.genres', 'genre')
      .leftJoinAndSelect('book.author', 'author')
      .getMany();
    return listBook;
  }

  async saveBook(book: BookDto): Promise<void> {
    await this.bookRepository.save(book);
  }

  async getOne(id: string) {
    return await this. bookRepository
      .createQueryBuilder('book')
      .where('book.id = :id', { id: id })
      .leftJoinAndSelect('book.genres', 'genre')
      .leftJoinAndSelect('book.author', 'author')
      .getOne();
  }
}
