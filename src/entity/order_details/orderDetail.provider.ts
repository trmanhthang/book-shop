import { DataSource } from 'typeorm';
import { OrderDetail } from './orderDetail.entity';

export const orderDetailProvider = [
  {
    provide: 'ORDER_DETAIL_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(OrderDetail),
    inject: ['DATA_SOURCE'],
  },
];
