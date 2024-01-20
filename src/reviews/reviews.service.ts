import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './models/review.model';
import { QueryTypes } from 'sequelize';

@Injectable()
export class ReviewsService {
  async findAllFromProduct(productId: number, page: number, limit: number) {
    page = page || 1;
    limit = limit || 10;
    const reviewCount = await Review.count({
      where: { product_id: productId },
    });
    const avgRating = await Review.sequelize.query(
      `SELECT AVG(rating) FROM reviews WHERE reviews.product_id = ${productId}`,
      { type: QueryTypes.SELECT },
    );
    const result = await Review.findAll({
      where: { product_id: productId },
      offset: (page - 1) * limit,
      limit: limit,
    });
    if (result.length === 0) {
      throw new NotFoundException({
        message: 'Could not find reviews.',
        data: [],
      });
    }
    return {
      message: 'Success',
      product_id: productId,
      avg_rating: avgRating[0]['AVG(rating)'],
      review_count: reviewCount,
      current_page: page,
      total_pages: Math.ceil(reviewCount / limit),
      data: result,
    };
  }

  async findOne(id: number) {
    const result = await Review.findByPk(id);
    if (!result) {
      throw new NotFoundException({
        message: 'Could not find review.',
        data: [],
      });
    }
    return {
      message: 'Success',
      data: result,
    };
  }

  async create(createReviewDto: CreateReviewDto) {
    try {
      const result = await Review.create(createReviewDto);
      return {
        message: 'Success',
        data: result,
      };
    } catch (error) {
      throw new NotFoundException({
        message: 'Could not create review.',
        data: [],
      });
    }
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    const review = await Review.findByPk(id);
    if (!review) {
      throw new NotFoundException({
        message: `Could not find review with id ${id}.`,
      });
    }
    review.rating = updateReviewDto.rating || review.rating;
    review.comment = updateReviewDto.comment || review.comment;
    const result = await review.save();
    return {
      message: 'Success',
      data: result,
    };
  }

  async remove(id: number) {
    try {
      const result = await Review.destroy({ where: { review_id: id } });
      if (!result) {
        throw new NotFoundException({
          message: `Could not find review with id ${id}.`,
        });
      }
      return {
        message: `Review with id ${id} has been deleted.`,
      };
    } catch (error) {
      throw new BadRequestException({
        message: error.message,
      });
    }
  }
}
