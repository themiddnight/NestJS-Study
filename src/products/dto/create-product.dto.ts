import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../../category/models/category.model';

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

interface Product {
  id: number;
  name: string;
  price: number;
  cat_id: number;
  category: Category;
}

/**
 * Include message, current_page, total_pages, next, previous, data
 */
export class ResponseProductsDto {
  message: string;
  current_page: number;
  total_pages: number;
  next: string;
  previous: string;
  data: Product[];
}

/**
 * Include message, data
 */
export class ResponseProductDto {
  message: string;
  data: Product;
}

export class DeleteProductDto {
  message: string;
}
