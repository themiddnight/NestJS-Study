import { Controller, Get, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoryService: CategoriesService) {}

  @Get()
  findAllCategories(@Query('name') name?: string) {
    if (name) {
      return this.categoryService.findCategoryByName(name);
    }
    return this.categoryService.findAllCategories();
  }
}
