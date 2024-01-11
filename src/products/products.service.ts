import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { Op } from 'sequelize';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './models/product.model';
import { Category } from '../category/models/category.model';

@Injectable()
export class ProductsService {
  async findAll(): Promise<CreateProductDto[]> {
    return await Product.findAll({
      include: { model: Category, attributes: ['name'] },
    });
  }

  async findOne(id: number): Promise<CreateProductDto> {
    const result = await Product.findOne({
      where: { id: id },
      include: { model: Category, attributes: ['name'] },
    });
    if (!result) {
      throw new NotFoundException('Could not find product.');
    }
    return result;
  }

  async findName(name: string): Promise<CreateProductDto[]> {
    const result = await Product.findAll({
      where: { name: { [Op.like]: `%${name}%` } },
      include: { model: Category, attributes: ['name'] },
    });
    if (!result) {
      throw new NotFoundException('Could not find product.');
    }
    return result;
  }

  async findPage(page: number, limit: number): Promise<CreateProductDto[]> {
    const result = await Product.findAll({
      offset: (page - 1) * limit,
      limit: limit,
      include: { model: Category, attributes: ['name'] },
    });
    if (!result) {
      throw new NotFoundException('Could not find product.');
    }
    return result;
  }

  async create(createProductDto: CreateProductDto): Promise<CreateProductDto> {
    try {
      return await Product.create(createProductDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async bulkCreate(
    createProductDto: CreateProductDto[],
  ): Promise<CreateProductDto[]> {
    try {
      return await Product.bulkCreate(createProductDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<CreateProductDto> {
    const product = await Product.findOne({ where: { id: id } });
    if (!product) {
      throw new NotFoundException('Could not find product.');
    }
    product.name = updateProductDto.name || product.name;
    product.price = updateProductDto.price || product.price;
    product.cat_id = updateProductDto.cat_id || product.cat_id;
    try {
      return await product.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: number): Promise<CreateProductDto> {
    const product = await Product.findOne({ where: { id: id } });
    if (!product) {
      throw new NotFoundException('Could not find product.');
    }
    product.destroy();
    return product;
  }
}
