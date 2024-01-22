import { DataSource } from 'typeorm';
import { CartDetail } from './cartDetail.entity';

export const cartDetailProvider = [
  {
    provide: 'CART_DETAIL_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CartDetail),
    inject: ['DATA_SOURCE'],
  },
];
