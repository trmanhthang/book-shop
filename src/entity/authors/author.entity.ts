import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Author {
  @PrimaryGeneratedColumn({ name: 'id' })
  private id: number;

  @Column({ name: 'fullName' })
  private fullName: string;

  @Column({ name: 'address' })
  private address: string;

  @Column({ name: 'description' })
  private description: string;

  @Column({ name: 'gender' })
  private gender: string;

  get getId(): number {
    return this.id;
  }

  set setId(value: number) {
    this.id = value;
  }

  get getFullName(): string {
    return this.fullName;
  }

  set setFullName(value: string) {
    this.fullName = value;
  }

  get getAddress(): string {
    return this.address;
  }

  set setAddress(value: string) {
    this.address = value;
  }

  get getDescription(): string {
    return this.description;
  }

  set setDescription(value: string) {
    this.description = value;
  }

  get getGender(): string {
    return this.gender;
  }

  set setGender(value: string) {
    this.gender = value;
  }
}
