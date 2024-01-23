import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Book } from '../entity/books/book.entity';
import { User } from '../entity/users/user.entity';

export class ReviewPostDTO {
  @IsString()
  @IsNotEmpty()
  comment: string;

  @IsString()
  @IsNotEmpty()
  datePost: string;

  @IsNotEmpty()
  book: Book;

  @IsNotEmpty()
  user: User;
}

export class ReviewDeleteDTO {
  @IsNumber()
  @IsNotEmpty()
  review: number;

  @IsNumber()
  @IsNotEmpty()
  book: number;

  @IsNumber()
  @IsNotEmpty()
  user: number;
}
