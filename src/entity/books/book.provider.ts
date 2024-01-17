import { DataSource } from 'typeorm';
import { Book } from './book.entity';

export const bookProvider = [
  {
    provide: 'BOOK_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Book),
    inject: ['DATA_SOURCE'],
  },
];
