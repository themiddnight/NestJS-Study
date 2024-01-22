import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsPositive, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  description?: string;

  @IsOptional()
  @Transform(({ value }) => parseFloat(value))
  @IsPositive()
  @ApiProperty({ required: false, default: 100 })
  price?: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsPositive()
  @ApiProperty({
    required: false,
    description: 'Category ID',
  })
  category_id?: number;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  image_url?: string;
}
