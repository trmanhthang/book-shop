import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './app/auth/auth.module';
import cookieParser from 'cookie-parser';
import { PassportModule } from '@nestjs/passport';
import { BookModule } from './app/book/book.module';
import { AuthorModule } from './app/author/author.module';
import { GenreModule } from './app/genre/genre.module';
import { OrderModule } from './app/order/order.module';
import { ReviewModule } from './app/review/review.module';
import { CartModule } from './app/cart/cart.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'google' }),
    CartModule,
    AuthModule,
    BookModule,
    AuthorModule,
    GenreModule,
    OrderModule,
    ReviewModule,
  ],
  providers: [],
})
export class AppModule {}
