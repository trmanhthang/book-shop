import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../../entity/users/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserLogin, UserRegisterDto } from '../../dto/user.dto';
import * as bcrypt from 'bcryptjs';
import { Role } from '../../entity/roles/role.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
    @Inject('ROLE_REPOSITORY')
    private readonly roleRepository: Repository<Role>,
    private readonly jwtService: JwtService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 16);
  }

  async checkPassword(
    password: string,
    hashPassword: string,
  ): Promise<boolean> {
    const flag = await bcrypt.compare(password, hashPassword);
    return flag;
  }

  async checkUserByEmail(email: string): Promise<boolean> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email: email })
      .getOne();
    return !!user;
  }

  async createToken(user: User): Promise<string> {
    const payload = {
      username: user.getUsername,
      password: user.getPassword,
      email: user.getEmail,
      role: user.getRole,
    };
    return this.jwtService.sign(payload);
  }

  async registerUser(userRegister: UserRegisterDto): Promise<boolean> {
    const flag = await this.checkUserByEmail(userRegister.email);

    if (flag) {
      return false;
    } else {
      const role = await this.roleRepository
        .createQueryBuilder('role')
        .where('role.id = :id', { id: 2 })
        .getOne();
      const hashPassword = await this.hashPassword(userRegister.password);
      const userCreate = {
        username: userRegister.username,
        password: hashPassword,
        email: userRegister.email,
        fullName: userRegister.fullName,
        avatar: userRegister.avatar,
        role: role,
      };
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      await this.userRepository.save(userCreate);
      return true;
    }
  }

  async login(userLogin: UserLogin) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', {
        email: userLogin.email,
      })
      .leftJoinAndSelect('user.role', 'role')
      .getOne();
    if (user) {
      const flag = await this.checkPassword(
        userLogin.password,
        user.getPassword,
      );
      if (flag) {
        return this.createToken(user);
      } else {
        return '';
      }
    } else {
      return '';
    }
  }

  testGraphQL() {
    return this.userRepository.find();
  }
}
