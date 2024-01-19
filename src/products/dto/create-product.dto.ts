import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../models/product.model';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty({ default: 100 })
  price: number;

  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty({
    description: 'Category ID',
    default: 1,
  })
  cat_id: number;
}

/**
 * Include message, current_page, total_pages, next, previous, data
 */
export class ResponseProductsDto {
  @ApiProperty()
  message: string;

  @ApiProperty()
  current_page: number;

  @ApiProperty()
  total_pages: number;

  @ApiProperty({ type: Product, isArray: true })
  data: Product[];
}

/**
 * Include message, data
 */
export class ResponseProductDto {
  @ApiProperty()
  message: string;

  @ApiProperty({ type: Product })
  data: Product;
}

export class DeleteProductDto {
  @ApiProperty()
  message: string;
}
