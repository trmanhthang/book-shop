import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn({ name: 'id' })
  private id: number;

  @Column({ name: 'role' })
  private role: string;

  get getId(): number {
    return this.id;
  }

  set setId(value: number) {
    this.id = value;
  }

  get getRole(): string {
    return this.role;
  }

  set setRole(value: string) {
    this.role = value;
  }
}
