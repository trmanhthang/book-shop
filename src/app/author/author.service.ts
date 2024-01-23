import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Author } from '../../entity/authors/author.entity';
import { AuthorDTO } from '../../dto/author.dto';

@Injectable()
export class AuthorService {
  constructor(
    @Inject('AUTHOR_REPOSITORY')
    private readonly authorRepository: Repository<Author>,
  ) {}
  async save(author: AuthorDTO) {
    await this.authorRepository.save(author);
  }

  async getAll(): Promise<Author[]> {
    try {
      return await this.authorRepository
        .createQueryBuilder('author')
        .leftJoinAndSelect('author.books', 'book')
        .getMany();
    } catch (err) {
      console.log(err);
    }
  }

  async getOne(id: string): Promise<Author> {
    return await this.authorRepository
      .createQueryBuilder('author')
      .where('author.id = :id', { id: id })
      .leftJoinAndSelect('author.books', 'book')
      .getOne();
  }
}
