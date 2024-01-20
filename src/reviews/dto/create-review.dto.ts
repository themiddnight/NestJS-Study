import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  product_id: number;

  @IsOptional()
  @IsString()
  comment: string;

  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  rating: number;
}
