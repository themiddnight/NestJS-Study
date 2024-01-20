import {
  Controller,
  Get,
  Post,
  Query,
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
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
@ApiTags('Products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @ApiOperation({
    summary:
      'List of products. You can filter by name, category_id, set page and limit. Default limit = 10',
  })
  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({ name: 'category_id', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  findAll(
    @Query('name') name?: string,
    @Query('category_id') category_id?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.productsService.findAll(name, +category_id, +page, +limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Detail of product' })
  @ApiParam({ name: 'id', required: true })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a product' })
  @ApiBody({ type: CreateProductDto })
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiConsumes('application/json')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a product' })
  @ApiBody({ type: UpdateProductDto })
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiConsumes('application/json')
  @ApiParam({ name: 'id', required: true })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product' })
  @ApiParam({ name: 'id', required: true })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(+id);
  }
}
