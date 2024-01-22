import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './models/review.model';

@Injectable()
export class ReviewsService {
  async findAllFromProduct(productId: number, page: number, limit: number) {
    page = page || 1;
    limit = limit || 10;
    const reviewCount = await Review.count({
      where: { product_id: productId },
    });
    const { rating } = await Review.findOne({
      attributes: [
        [Review.sequelize.fn('AVG', Review.sequelize.col('rating')), 'rating'],
      ],
      where: { product_id: productId },
    });
    const result = await Review.findAll({
      where: { product_id: productId },
      offset: (page - 1) * limit,
      limit: limit,
      order: [['createdAt', 'DESC']],
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
      avg_rating: Number(rating),
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
      throw new BadRequestException({
        message: error.message,
        data: [],
      });
    }
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    const result = await Review.update(updateReviewDto, {
      where: { review_id: id },
    });
    if (result[0] === 0) {
      throw new NotFoundException({
        message: `Could not find review with id ${id}.`,
      });
    }
    return {
      message: `Review with id ${id} has been updated.`,
    };
  }

  async remove(id: number) {
    const result = await Review.destroy({ where: { review_id: id } });
    if (result === 0) {
      throw new NotFoundException({
        message: `Could not find review with id ${id}.`,
      });
    }
    return {
      message: `Review with id ${id} has been deleted.`,
    };
  }
}
