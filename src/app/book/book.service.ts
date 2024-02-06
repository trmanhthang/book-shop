import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Book } from '../../entity/books/book.entity';
import { BookDto } from '../../dto/book.dto';
import { CartDetail } from '../../entity/cart_details/cartDetail.entity';
import slugify from 'slugify';

@Injectable()
export class BookService {
  constructor(
    @Inject('BOOK_REPOSITORY')
    private readonly bookRepository: Repository<Book>,
  ) {}

  async getAllBook(): Promise<Book[]> {
    return await this.bookRepository
      .createQueryBuilder('book')
      .leftJoinAndSelect('book.genres', 'genre')
      .leftJoinAndSelect('book.author', 'author')
      .getMany();
  }

  async saveBook(book: BookDto): Promise<void> {
    book.slug = slugify(book.title, { lower: true, locale: 'vi' });
    await this.bookRepository.save(book);
  }

  async getOne(id: number) {
    return await this.bookRepository
      .createQueryBuilder('book')
      .leftJoinAndSelect('book.genres', 'genre')
      .leftJoinAndSelect('book.author', 'author')
      .leftJoinAndSelect('book.reviews', 'reviews')
      .leftJoinAndSelect('reviews.user', 'user')
      .where('book.id = :id', { id: id })
      .getOne();
  }

  async findById(id: number) {
    return await this.bookRepository
      .createQueryBuilder('book')
      .where('book.id = :id', { id: id })
      .getOne();
  }

  async updateQuantity(book: Book, cartDetails: CartDetail) {
    const newBook = await this.findById(book.id);
    await this.bookRepository
      .createQueryBuilder('book')
      .update(Book)
      .set({ quantity: newBook.quantity - cartDetails.quantity })
      .where('id = :id', { id: book.id })
      .execute();
  }

  async getOneBySlug(slug: string) {
    return await this.bookRepository
      .createQueryBuilder('book')
      .leftJoinAndSelect('book.genres', 'genre')
      .leftJoinAndSelect('book.author', 'author')
      .leftJoinAndSelect('book.reviews', 'reviews')
      .leftJoinAndSelect('reviews.user', 'user')
      .where('book.slug = :slug', { slug: slug })
      .getOne();
  }

  async getBookByGenre(id: string) {
    return await this.bookRepository
      .createQueryBuilder('book')
      .leftJoinAndSelect('book.genres', 'genres')
      .where('genres.id = :id', { id: id })
      .select([
        'book.id',
        'book.title',
        'book.publication_date',
        'book.price',
        'book.quantity',
        'book.ISBN',
        'book.image',
        'book.slug',
      ])
      .getMany();
  }

  async getBookByAuthor(id: string) {
    return await this.bookRepository
      .createQueryBuilder('book')
      .leftJoinAndSelect('book.author', 'author')
      .where('author.id = :id', { id: id })
      .select([
        'book.id',
        'book.title',
        'book.publication_date',
        'book.price',
        'book.quantity',
        'book.ISBN',
        'book.image',
        'book.slug',
      ])
      .getMany();
  }
}
