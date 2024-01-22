import { DataSource } from 'typeorm';
import * as process from 'process';
import { User } from '../../entity/users/user.entity';
import { Role } from '../../entity/roles/role.entity';
import { Author } from '../../entity/authors/author.entity';
import { Book } from '../../entity/books/book.entity';
import { Genre } from '../../entity/genres/genre.entity';
import { OrderDetail } from '../../entity/order_details/orderDetail.entity';
import { Order } from '../../entity/orders/order.entity';
import { Review } from '../../entity/reviews/review.entity';
import { Cart } from '../../entity/carts/cart.entity';
import { CartDetail } from '../../entity/cart_details/cartDetail.entity';

export const databaseProviders = {
  provide: 'DATA_SOURCE',
  useFactory: async (): Promise<DataSource> => {
    const dataSource: DataSource = new DataSource({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE_NAME,
      entities: [
        User,
        Role,
        Author,
        Book,
        Genre,
        OrderDetail,
        Order,
        Review,
        Cart,
        CartDetail,
      ],
      synchronize: true,
      logging: true,
    });
    return dataSource.initialize();
  },
};
