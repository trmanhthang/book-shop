import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseModule } from '../../config/database/database.module';
import { userProviders } from '../../entity/users/user.providers';
import { roleProviders } from '../../entity/roles/role.providers';
import { jwtConstants } from './constants';
import { GoogleOauthStrategy } from '../../config/strategy/google/google-oauth.strategy';
import { CartModule } from '../cart/cart.module';

@Module({
  imports: [
    DatabaseModule,
    CartModule,
    JwtModule.register({
      secret: jwtConstants.secret,
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
