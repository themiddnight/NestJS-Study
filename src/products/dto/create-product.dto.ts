import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
// import { Category } from '../../category/models/category.model';
import { Product } from '../models/product.model';

// class Product {
//   @ApiProperty()
//   id: number;

//   @ApiProperty()
//   name: string;

//   @ApiProperty()
//   price: number;

//   @ApiProperty()
//   cat_id: number;

//   @ApiProperty()
//   category: Category;
// }

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

  @ApiProperty()
  data: Product;
}

export class DeleteProductDto {
  @ApiProperty()
  message: string;
}
