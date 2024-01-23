import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Genre } from '../../entity/genres/genre.entity';
import { GenreDto } from '../../dto/genre.dto';

@Injectable()
export class GenreService {
  constructor(
    @Inject('GENRE_REPOSITORY')
    private readonly genreRepository: Repository<Genre>,
  ) {}

  async getAllGenre(): Promise<Genre[]> {
    return await this.genreRepository
      .createQueryBuilder('genre')
      .leftJoinAndSelect('genre.books', 'books')
      .getMany();
  }

  async getAllGenreCategory(): Promise<Genre[]> {
    return await this.genreRepository.createQueryBuilder('genre').getMany();
  }

  async saveGenre(genre: GenreDto) {
    await this.genreRepository.save(genre);
  }
}
