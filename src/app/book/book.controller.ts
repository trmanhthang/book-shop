import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from '../../entity/books/book.entity';
import { BookDto } from '../../dto/book.dto';
import { AuthenticationGuard } from '../../guards/authentication.guard';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  /**
   * Lấy tất cả sách trong db
   * **/
  @Get('all')
  async getAllBook(): Promise<Book[]> {
    return this.bookService.getAllBook();
  }

  /**
   * Thêm 1 sách vào db
   * **/
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

  /**
   * Lấy thông tin chi tiết 1 sách
   * **/
  @UseGuards(AuthenticationGuard)
  @Get('detail')
  async getOne(@Query('slug') slug: string, @Res() res) {
    const book = await this.bookService.getOneBySlug(slug);
    if (book) {
      res.status(HttpStatus.OK).json(book);
    } else {
      res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Không có sản phẩm!',
      });
    }
  }

  /**
   * Lấy sách danh sách theo danh mục
   * **/
  @Get('genre')
  async getBookByGenre(@Query('id') id, @Res() res) {
    const books = await this.bookService.getBookByGenre(id);
    res.status(HttpStatus.OK).json(books);
  }

  /**
   *
   * **/
  @Get('author')
  async getBookByAuthor(@Query('id') id, @Res() res) {
    const books = await this.bookService.getBookByAuthor(id);

    res.status(HttpStatus.OK).json(books);
  }
}
