import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Review } from '../../entity/reviews/review.entity';
import { ReviewDeleteDTO, ReviewPostDTO } from '../../dto/review.dto';
import { Book } from '../../entity/books/book.entity';

@Injectable()
export class ReviewService {
  constructor(
    @Inject('REVIEW_REPOSITORY')
    private readonly reviewRepository: Repository<Review>,
  ) {}

  async saveReview(review: ReviewPostDTO) {
    await this.reviewRepository.save(review);
  }

  async findReviewsByBook(id: number) {
    return await this.reviewRepository
      .createQueryBuilder('review')
      .leftJoinAndSelect('review.user', 'user')
      .where('review.book_id = :book', { book: id })
      .getMany();
  }

  async deleteReview(review, book, user): Promise<void> {
    await this.reviewRepository
      .createQueryBuilder('review')
      .delete()
      .where('review.id = :id', { id: review })
      .andWhere('review.user_id = :user', { user: user })
      .andWhere('review.book_id = :book', { book: book })
      .execute();
  }
}
