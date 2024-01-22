import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { DatabaseModule } from '../../config/database/database.module';
import { bookProviders } from '../../entity/books/book.provider';
import { BookService } from './book.service';

@Module({
  imports: [DatabaseModule],
  controllers: [BookController],
  providers: [...bookProviders, BookService],
  exports: [BookService],
})
export class BookModule {}
