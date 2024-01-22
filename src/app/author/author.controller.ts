import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorDTO } from '../../dto/author.dto';
import { Author } from '../../entity/authors/author.entity';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post('save')
  async saveAuthor(@Body() author: AuthorDTO, @Res() res) {
    try {
      await this.authorService.save(author);
      res.status(HttpStatus.OK).json({
        statusCode: 200,
        message: 'Thêm tác giả thành công!',
      });
    } catch {
      res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Lỗi thêm tác giả!',
      });
    }
  }

  @Get('all')
  async getAllAuthor(): Promise<Author[]> {
    return await this.authorService.getAll();
  }

  @Get('/:id')
  async getOne(@Param('id') id: string, @Res() res) {
    const author = await this.authorService.getOne(id);
    if (author) {
      res.status(HttpStatus.OK).json(author);
    } else {
      res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Không có thông tin tác giả!',
      });
    }
  }
}
