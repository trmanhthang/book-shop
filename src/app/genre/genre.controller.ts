import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { GenreService } from './genre.service';
import { GenreDto } from '../../dto/genre.dto';

@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Get('category')
  async getAllGenreCategory() {
    return await this.genreService.getAllGenreCategory();
  }

  @Post('save')
  async saveGenre(@Body() genre: GenreDto, @Res() res) {
    try {
      await this.genreService.saveGenre(genre);
      res.status(HttpStatus.OK).json({
        statusCode: 200,
        message: 'Thêm thể loại thành công!',
      });
    } catch {
      res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Lỗi thêm thể loại!',
      });
    }
  }
}
