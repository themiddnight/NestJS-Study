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
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiQuery,
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
  @ApiResponse({ status: 200, description: 'List of categories' })
  @ApiQuery({ name: 'name', required: false })
  findAll(@Query('name') name?: string) {
    if (name) {
      return this.categoryService.findName(name);
    }
    return this.categoryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Detail of category' })
  @ApiResponse({ status: 200, description: 'Detail of category' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  @ApiParam({ name: 'id', required: true })
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.categoryService.findOne(+id);
  }

  @Get(':id/products')
  @ApiOperation({ summary: 'List of products by category' })
  @ApiResponse({ status: 200, description: 'List of products by category' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  @ApiParam({ name: 'id', required: true })
  findProducts(@Param('id', ParseIntPipe) id: string) {
    return this.categoryService.findProducts(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a category' })
  @ApiResponse({ status: 201, description: 'Create a category' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiBody({ type: CreateCategoryDto })
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiConsumes('application/json')
  create(@Body() createCategoryDto: CreateCategoryDto | CreateCategoryDto[]) {
    if (Array.isArray(createCategoryDto)) {
      return this.categoryService.bulkCreate(createCategoryDto);
    }
    return this.categoryService.create(createCategoryDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a category' })
  @ApiResponse({ status: 200, description: 'Update a category' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiParam({ name: 'id', required: true })
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a category' })
  @ApiResponse({ status: 200, description: 'Delete a category' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiParam({ name: 'id', required: true })
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.categoryService.remove(+id);
  }
}
