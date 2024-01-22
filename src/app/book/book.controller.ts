import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from '../../entity/books/book.entity';
import { BookDto } from '../../dto/book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get('all')
  async getAllBook(): Promise<Book[]> {
    return this.bookService.getAllBook();
  }

  @Post('save')
  async createBook(@Body() book: BookDto, @Res() res) {
    try {
      await this.bookService.saveBook(book);
      res
        .status(HttpStatus.OK)
        .json({ statusCode: 200, message: 'Tạo sản phẩm thành công!' });
    } catch (err) {
      console.log(err);
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ statusCode: 400, message: 'Lỗi tạo sản phẩm!' });
    }
  }

  @Get('/:id')
  async getOne(@Param('id') id: string, @Res() res) {
    const book = await this.bookService.getOne(id);
    if (book) {
      res.status(HttpStatus.OK).json(book);
    } else {
      res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Không có sản phẩm!',
      });
    }
  }
}
