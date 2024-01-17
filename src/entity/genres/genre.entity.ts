import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Genre {
  @PrimaryGeneratedColumn({ name: 'id' })
  private id: number;

  @Column({ name: 'genre' })
  private genre: string;

  get getId(): number {
    return this.id;
  }

  set setId(value: number) {
    this.id = value;
  }

  get getGenre(): string {
    return this.genre;
  }

  set setGenre(value: string) {
    this.genre = value;
  }
}
