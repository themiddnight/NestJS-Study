import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Op } from 'sequelize';

import {
  CreateProductDto,
  ResponseProductsDto,
  ResponseProductDto,
  DeleteProductDto,
} from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './models/product.model';
import { Category } from '../category/models/category.model';

@Injectable()
export class ProductsService {
  base_url: any;
  port: any;
  api_path: any;

  constructor(private configService: ConfigService) {
    this.base_url = this.configService.get('base_url');
    this.api_path = this.configService.get('api_path');
  }

  async findAll(
    name: string,
    page: number,
    limit: number,
  ): Promise<ResponseProductsDto> {
    const nameParam = name || '';
    const pageParam = page || 1;
    const limitParam = limit || 10;
    const productCount = await Product.count({
      where: { name: { [Op.like]: `%${nameParam}%` } },
    });
    const result = await Product.findAll({
      attributes: ['id', 'name', 'price'],
      where: { name: { [Op.like]: `%${nameParam}%` } },
      offset: (pageParam - 1) * limitParam,
      limit: limitParam,
      include: { model: Category, attributes: ['id', 'name'] },
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
    cat_id: number,
    page: number,
    limit: number,
  ): Promise<ResponseProductsDto> {
    const pageParam = page || 1;
    const limitParam = limit || 10;
    const productCount = await Product.count({
      where: { cat_id: cat_id },
    });
    const result = await Product.findAll({
      attributes: ['id', 'name', 'price'],
      where: { cat_id: cat_id },
      offset: (pageParam - 1) * limitParam,
      limit: limitParam,
      include: { model: Category, attributes: ['id', 'name'] },
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
      attributes: ['id', 'name', 'price', 'createdAt', 'updatedAt'],
      where: { id: id },
      include: { model: Category, attributes: ['id', 'name'] },
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
    const product = await Product.findOne({ where: { id: id } });
    if (!product) {
      throw new NotFoundException({
        message: `Could not find product with id ${id}.`,
      });
    }
    product.name = updateProductDto.name || product.name;
    product.price = updateProductDto.price || product.price;
    product.cat_id = updateProductDto.cat_id || product.cat_id;
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

  async remove(id: number): Promise<DeleteProductDto> {
    try {
      const result = await Product.destroy({ where: { id: id } });
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
