import { IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  description: string;

  @IsNotEmpty()
  @Transform(({ value }) => parseFloat(value))
  @IsPositive()
  @ApiProperty({ default: 100 })
  price: number;

  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  @IsPositive()
  @ApiProperty({
    description: 'Category ID',
    default: 1,
  })
  category_id: number;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  image_url: string;
}
