import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './app/auth/auth.module';
import cookieParser from 'cookie-parser';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: 'src/schema.gql',
    }),
  ],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    // Sử dụng cookie-parser middleware cho tất cả các routes
    consumer.apply(cookieParser).forRoutes('*');
  }
}
