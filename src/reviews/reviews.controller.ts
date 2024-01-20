import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Controller('reviews')
@ApiTags('Reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get('product/:id')
  @ApiOperation({
    summary:
      'List of reviews from a product. You can set page and limit. Default limit = 10',
  })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  findAllFromProduct(
    @Param('id', ParseIntPipe) id: string,
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    return this.reviewsService.findAllFromProduct(+id, +page, +limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Detail of review' })
  @ApiParam({ name: 'id', required: true })
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.reviewsService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a review' })
  @ApiBody({ type: CreateReviewDto })
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiConsumes('application/json')
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(createReviewDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a review' })
  @ApiParam({ name: 'id', required: true })
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiConsumes('application/json')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    return this.reviewsService.update(+id, updateReviewDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a review' })
  @ApiParam({ name: 'id', required: true })
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.reviewsService.remove(+id);
  }
}
