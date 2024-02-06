import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseModule } from '../../config/database/database.module';
import { userProviders } from '../../entity/users/user.providers';
import { roleProviders } from '../../entity/roles/role.providers';
import { GoogleOauthStrategy } from '../../config/strategy/google/google-oauth.strategy';
import { CartModule } from '../cart/cart.module';
import * as process from 'process';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    DatabaseModule,
    CartModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    ...userProviders,
    ...roleProviders,
    AuthService,
    GoogleOauthStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
