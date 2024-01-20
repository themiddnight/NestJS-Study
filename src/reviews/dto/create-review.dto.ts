import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  @ApiProperty()
  product_id: number;

  @IsOptional()
  @IsString()
  @ApiProperty()
  comment: string;

  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  @ApiProperty()
  rating: number;
}
