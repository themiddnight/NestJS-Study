import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Op } from 'sequelize';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  ResponseProductDto,
  ResponseProductsDto,
} from './dto/response-product.dto';
import { Product } from './models/product.model';
import { Category } from '../category/models/category.model';

@Injectable()
export class ProductsService {
  private defaultPage = 1;
  private defaultLimit = 10;

  async findAll(
    name: string,
    page: number,
    limit: number,
  ): Promise<ResponseProductsDto> {
    const nameParam = name || '';
    const pageParam = page || this.defaultPage;
    const limitParam = limit || this.defaultLimit;
    const productCount = await Product.count({
      where: { name: { [Op.like]: `%${nameParam}%` } },
    });
    const result = await Product.findAll({
      attributes: [['product_id', 'id'], 'name', 'price'],
      where: { name: { [Op.like]: `%${nameParam}%` } },
      offset: (pageParam - 1) * limitParam,
      limit: limitParam,
      include: { model: Category, attributes: [['category_id', 'id'], 'name'] },
    });
    if (result.length === 0) {
      throw new NotFoundException({
        message: 'Could not find products.',
        data: [],
      });
    }
    return {
      message: 'Success',
      current_page: pageParam,
      total_pages: Math.ceil(productCount / limitParam),
      data: result,
    };
  }

  async findByCategory(
    category_id: number,
    page: number,
    limit: number,
  ): Promise<ResponseProductsDto> {
    const pageParam = page || this.defaultPage;
    const limitParam = limit || this.defaultLimit;
    const productCount = await Product.count({
      where: { category_id: category_id },
    });
    const result = await Product.findAll({
      attributes: [['product_id', 'id'], 'name', 'price'],
      where: { category_id: category_id },
      offset: (pageParam - 1) * limitParam,
      limit: limitParam,
      include: { model: Category, attributes: [['category_id', 'id'], 'name'] },
    });
    if (result.length === 0) {
      throw new NotFoundException({
        message: 'Could not find products.',
        data: [],
      });
    }
    return {
      message: 'Success',
      current_page: pageParam,
      total_pages: Math.ceil(productCount / limitParam),
      data: result,
    };
  }

  async findOne(id: number): Promise<ResponseProductDto> {
    const result = await Product.findOne({
      attributes: [
        ['product_id', 'id'],
        'name',
        'price',
        'createdAt',
        'updatedAt',
      ],
      where: { product_id: id },
      include: { model: Category, attributes: [['category_id', 'id'], 'name'] },
    });
    if (!result) {
      throw new NotFoundException({
        message: `Could not find product with id ${id}.`,
        data: {},
      });
    }
    return {
      message: 'Success',
      data: result,
    };
  }

  async create(
    createProductDto: CreateProductDto,
  ): Promise<ResponseProductDto> {
    try {
      const result = await Product.create(createProductDto);
      return {
        message: `Product with id ${result.id} has been created.`,
        data: result,
      };
    } catch (error) {
      throw new BadRequestException({
        message: error.message,
        data: {},
      });
    }
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<ResponseProductDto> {
    const product = await Product.findOne({ where: { product_id: id } });
    if (!product) {
      throw new NotFoundException({
        message: `Could not find product with id ${id}.`,
      });
    }
    product.name = updateProductDto.name || product.name;
    product.price = updateProductDto.price || product.price;
    product.category_id = updateProductDto.category_id || product.category_id;
    try {
      const result = await product.save();
      return {
        message: `Product with id ${id} has been updated.`,
        data: result,
      };
    } catch (error) {
      throw new BadRequestException({
        message: error.message,
      });
    }
  }

  async remove(id: number) {
    try {
      const result = await Product.destroy({ where: { product_id: id } });
      if (result === 0) {
        throw new NotFoundException({
          message: `Could not find product with id ${id}.`,
        });
      }
      return {
        message: `Product with id ${id} has been deleted.`,
      };
    } catch (error) {
      throw new BadRequestException({
        message: error.message,
      });
    }
  }
}
