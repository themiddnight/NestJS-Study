import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

import { InjectModel } from '@nestjs/sequelize';
import { Product } from './models/product.model';
import { Category } from 'src/category/models/category.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product)
    private productModel: typeof Product,
  ) {}

  async findAll(): Promise<CreateProductDto[]> {
    return this.productModel.findAll({
      include: [Category],
    });
  }

  async findOne(id: number): Promise<CreateProductDto> {
    return this.productModel.findOne({
      include: [Category],
      where: {
        id: id,
      },
    });
  }

  async findName(name: string): Promise<CreateProductDto[]> {
    return this.productModel.findAll({
      include: [Category],
      where: {
        name: name,
      },
    });
  }

  async create(createProductDto: CreateProductDto): Promise<CreateProductDto> {
    const product = new Product();
    product.name = createProductDto.name;
    product.price = createProductDto.price;
    product.cat_id = createProductDto.cat_id;
    return product.save();
  }

  async bulkCreate(
    createProductDto: CreateProductDto[],
  ): Promise<CreateProductDto[]> {
    return this.productModel.bulkCreate(createProductDto);
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<CreateProductDto> {
    const product = await this.productModel.findOne({
      where: {
        id: id,
      },
    });
    product.name = updateProductDto.name;
    product.price = updateProductDto.price;
    product.cat_id = updateProductDto.cat_id;
    return product.save();
  }

  async remove(id: number): Promise<CreateProductDto> {
    const product = await this.productModel.findOne({
      where: {
        id: id,
      },
    });
    product.destroy();
    return product;
  }
}
