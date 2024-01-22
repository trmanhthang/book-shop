import { Module } from '@nestjs/common';
import { authorProvider } from '../../entity/authors/author.provider';
import { AuthorController } from './author.controller';
import { AuthorService } from './author.service';
import { DatabaseModule } from '../../config/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AuthorController],
  providers: [...authorProvider, AuthorService],
  exports: [AuthorService],
})
export class AuthorModule {}
