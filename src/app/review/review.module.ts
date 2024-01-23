import { Module } from '@nestjs/common';
import { reviewProviders } from '../../entity/reviews/review.providers';
import { ReviewController } from './review.controller';
import { DatabaseModule } from '../../config/database/database.module';
import { ReviewService } from './review.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ReviewController],
  providers: [...reviewProviders, ReviewService],
  exports: [ReviewService],
})
export class ReviewModule {}
