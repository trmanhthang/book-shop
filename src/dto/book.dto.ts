import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Genre } from '../entity/genres/genre.entity';
import { Author } from '../entity/authors/author.entity';

export class BookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsNotEmpty()
  @IsString()
  publicationDate: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsString()
  ISBN: string;

  @IsArray()
  genres: Genre[];

  @IsNotEmpty()
  author: Author;

  slug: string;
}
