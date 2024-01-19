import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../models/product.model';

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

export class ResponseProductDto {
  @ApiProperty()
  message: string;

  @ApiProperty({ type: Product })
  data: Product;
}
