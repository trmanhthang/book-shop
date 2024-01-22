import { DataSource } from 'typeorm';
import { Cart } from './cart.entity';

export const bookProviders = [
  {
    provide: 'CART_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Cart),
    inject: ['DATA_SOURCE'],
  },
];
