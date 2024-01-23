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
  id: number;

  @Column({ name: 'role_name' })
  role: string;

  @OneToMany(() => User, (user: User) => user.role)
  @JoinColumn({ name: 'user_id' })
  users: User[];
}
