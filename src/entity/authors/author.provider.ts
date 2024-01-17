import { DataSource } from 'typeorm';
import { Author } from './author.entity';

export const authorProvider = [
  {
    provide: 'AUTHOR_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Author),
    inject: ['DATA_SOURCE'],
  },
];
