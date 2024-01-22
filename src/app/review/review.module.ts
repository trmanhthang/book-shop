import { Module } from '@nestjs/common';
import { reviewProviders } from '../../entity/reviews/review.providers';
import { DataSource } from 'typeorm';

@Module({
  imports: [DataSource],
  controllers: [],
  providers: [...reviewProviders],
  exports: [],
})
export class ReviewModule {}
