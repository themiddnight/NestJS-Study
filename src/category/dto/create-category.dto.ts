import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;
}

interface Category {
  id: number;
  name: string;
}

export class ResponseCategoriesDto {
  message: string;
  data: Category[];
}

export class ResponseCategoryDto {
  message: string;
  data: Category;
}

export class DeleteCategoryDto {
  message: string;
}
