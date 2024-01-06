import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDto } from './dto/product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAllProducts(@Query('name') name?: string) {
    if (name) {
      return this.productsService.findProductsByName(name);
    }
    return this.productsService.findAllProducts();
  }

  @Get(':id')
  findProductById(@Param('id') id: string): ProductDto {
    return this.productsService.findProductById(Number(id));
  }

  @Post()
  createProduct(@Body() product: ProductDto) {
    return this.productsService.createProduct(product);
  }

  @Put(':id')
  updateProduct(@Param('id') id: string, @Body() product: ProductDto) {
    return this.productsService.updateProduct(Number(id), product);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProcuct(Number(id));
  }
}
