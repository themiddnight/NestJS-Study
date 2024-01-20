import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
@ApiTags('Categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  @ApiOperation({ summary: 'List of categories' })
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Detail of category' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  @ApiParam({ name: 'id', required: true })
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.categoryService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a category' })
  @ApiBody({ type: CreateCategoryDto })
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiConsumes('application/json')
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a category' })
  @ApiParam({ name: 'id', required: true })
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary:
      'Delete a category. If the category has products, the products will be deleted too.',
  })
  @ApiParam({ name: 'id', required: true })
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.categoryService.remove(+id);
  }
}
