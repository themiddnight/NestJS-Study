import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';

class ProductResponse extends PartialType(CreateProductDto) {
  @ApiProperty()
  product_id: number;
}

class ProductsResponse extends PickType(CreateProductDto, [
  'name',
  'price',
  'category_id',
  'image_url',
]) {
  @ApiProperty()
  product_id: number;
}

export class ResponseProductsDto {
  @ApiProperty()
  message: string;

  @ApiProperty()
  current_page: number;

  @ApiProperty()
  total_pages: number;

  @ApiProperty({ type: ProductsResponse, isArray: true })
  data: ProductsResponse[];
}

export class ResponseProductDto {
  @ApiProperty()
  message: string;

  @ApiProperty({ type: ProductResponse })
  data: ProductResponse;
}

export class ResponseDeleteProductDto {
  @ApiProperty()
  message: string;
}
