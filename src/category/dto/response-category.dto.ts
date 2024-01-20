import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';

class CategoryResponse extends PartialType(CreateCategoryDto) {
  @ApiProperty()
  category_id: number;
}

export class ResponseCategoriesDto {
  @ApiProperty()
  message: string;

  @ApiProperty({ isArray: true, type: CategoryResponse })
  data: CategoryResponse[];
}

export class ResponseCategoryDto {
  @ApiProperty()
  message: string;

  @ApiProperty({ type: CategoryResponse })
  data: CategoryResponse;
}
