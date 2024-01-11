import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ParseIntPipe,
} from '@nestjs/common';
import { NoFilesInterceptor } from '@nestjs/platform-express';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FormatProductResponseInterceptor } from './interceptors/product.interceptor';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @UseInterceptors(FormatProductResponseInterceptor)
  findAll(
    @Query('name') name?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    if (name) {
      return this.productsService.findName(name);
    }
    if (page || limit) {
      return this.productsService.findPage(+page || 1, +limit || 10);
    }
    return this.productsService.findAll();
  }

  @Get(':id')
  @UseInterceptors(FormatProductResponseInterceptor)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @Post()
  @UseInterceptors(NoFilesInterceptor())
  create(
    @Body()
    createProductDto: CreateProductDto | CreateProductDto[],
  ) {
    if (Array.isArray(createProductDto)) {
      return this.productsService.bulkCreate(createProductDto);
    }
    return this.productsService.create(createProductDto);
  }

  @Patch(':id')
  @UseInterceptors(NoFilesInterceptor())
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(+id);
  }
}
