import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn({ name: 'id' })
  private id: number;

  @Column({ name: 'role_name' })
  private role: string;

  @OneToMany(() => User, (user: User) => user.role)
  @JoinColumn({ name: 'user_id' })
  users: User[];

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
