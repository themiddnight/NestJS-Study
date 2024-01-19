import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../models/category.model';

export class ResponseCategoriesDto {
  @ApiProperty()
  message: string;

  @ApiProperty({ isArray: true, type: Category })
  data: Category[];
}

export class ResponseCategoryDto {
  @ApiProperty()
  message: string;

  @ApiProperty({ type: Category })
  data: Category;
}
