import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './app/auth/auth.module';
import cookieParser from 'cookie-parser';
import { PassportModule } from '@nestjs/passport';
import { BookModule } from './app/book/book.module';
import { AuthorModule } from './app/author/author.module';
import { GenreModule } from './app/genre/genre.module';
import { OrderModule } from './app/order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'google' }),
    AuthModule,
    BookModule,
    AuthorModule,
    GenreModule,
    OrderModule,
  ],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    // Sử dụng cookie-parser middleware cho tất cả các routes
    consumer.apply(cookieParser).forRoutes('*');
  }
}
