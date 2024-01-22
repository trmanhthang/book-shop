import { IsNotEmpty, IsString } from 'class-validator';

export class GenreDto {
  @IsString()
  @IsNotEmpty()
  genreName: string;
}
