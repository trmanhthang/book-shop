import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewDeleteDTO, ReviewPostDTO } from '../../dto/review.dto';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('post')
  async postReview(@Body() review: ReviewPostDTO, @Res() res) {
    try {
      await this.reviewService.saveReview(review);
      const data = await this.reviewService.findReviewsByBook(review.book.id);
      res.status(HttpStatus.OK).json(data);
    } catch {
      res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Đã xảy ra lỗi!',
      });
    }
  }

  @Delete('delete')
  async deleteReview(
    @Query('review') review,
    @Query('book') book,
    @Query('user') user,
    @Res() res,
  ) {
    try {
      await this.reviewService.deleteReview(review, book, user);
      const data = await this.reviewService.findReviewsByBook(book);
      res.status(HttpStatus.OK).json({
        data: data,
        message: 'Xoá đánh giá thành công!',
      });
    } catch {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Lỗi xoá đánh giá!',
      });
    }
  }
}
