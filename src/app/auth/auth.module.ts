import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule } from '../../config/database/database.module';
import { userProviders } from '../../entity/users/user.providers';
import { roleProviders } from '../../entity/roles/role.providers';
import { jwtConstants } from './constants';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({}),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AuthController],
  providers: [...userProviders, ...roleProviders, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
