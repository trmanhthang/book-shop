import { Module } from '@nestjs/common';
import { genreProvider } from '../../entity/genres/genre.provider';
import { GenreController } from './genre.controller';
import { GenreService } from './genre.service';
import { DatabaseModule } from '../../config/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [GenreController],
  providers: [...genreProvider, GenreService],
  exports: [GenreService],
})
export class GenreModule {}
