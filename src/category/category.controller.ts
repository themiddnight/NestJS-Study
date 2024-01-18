import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  findAll(@Query('name') name?: string) {
    if (name) {
      return this.categoryService.findName(name);
    }
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.categoryService.findOne(+id);
  }

  @Get(':id/products')
  findProducts(@Param('id', ParseIntPipe) id: string) {
    return this.categoryService.findProducts(+id);
  }

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto | CreateCategoryDto[]) {
    if (Array.isArray(createCategoryDto)) {
      return this.categoryService.bulkCreate(createCategoryDto);
    }
    return this.categoryService.create(createCategoryDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.categoryService.remove(+id);
  }
}
