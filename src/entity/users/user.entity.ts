import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../roles/role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ name: 'id' })
  private id: number;

  @Column({ name: 'username' })
  private username: string;

  @Column({ name: 'password' })
  private password: string;

  @Column({ name: 'email' })
  private email: string;

  @Column({ name: 'fullName' })
  private fullName: string;

  @Column({
    name: 'avatar',
    default:
      'https://cdn.sforum.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg',
  })
  private avatar: string;

  @Column({ name: 'status', default: true })
  private status: boolean;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role' })
  private role: Role;

  get getId(): number {
    return this.id;
  }

  set setId(value: number) {
    this.id = value;
  }

  get getUsername(): string {
    return this.username;
  }

  set setUsername(value: string) {
    this.username = value;
  }

  get getPassword(): string {
    return this.password;
  }

  set setPassword(value: string) {
    this.password = value;
  }

  get getEmail(): string {
    return this.email;
  }

  set setEmail(value: string) {
    this.email = value;
  }

  get getFullName(): string {
    return this.fullName;
  }

  set setFullName(value: string) {
    this.fullName = value;
  }

  get getAvatar(): string {
    return this.avatar;
  }

  set setAvatar(value: string) {
    this.avatar = value;
  }

  get getStatus(): boolean {
    return this.status;
  }

  set setStatus(value: boolean) {
    this.status = value;
  }

  get getRole(): Role {
    return this.role;
  }

  set setRole(value: Role) {
    this.role = value;
  }
}
