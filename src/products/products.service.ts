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

// Helper function
/**
 * Checks if a category exists.
 */
async function isValidCategory(category_id: number): Promise<boolean> {
  const category_ids = await Category.findAll({
    attributes: ['id'],
  });
  return category_ids.some((id) => id.id === category_id);
}

// CRUD operations
@Injectable()
export class ProductsService {
  async findAll(): Promise<CreateProductDto[]> {
    return Product.findAll({
      attributes: [
        'id',
        'name',
        'price',
        'cat_id',
        [Product.sequelize.col('Category.name'), 'cat_name'],
        'createdAt',
        'updatedAt',
      ],
      include: { model: Category, attributes: [] },
    });
  }

  async findOne(id: number): Promise<CreateProductDto> {
    const result = await Product.findOne({
      attributes: [
        'id',
        'name',
        'price',
        'cat_id',
        [Product.sequelize.col('Category.name'), 'cat_name'],
        'createdAt',
        'updatedAt',
      ],
      where: { id: id },
      include: { model: Category, attributes: [] },
    });
    if (!result) {
      throw new NotFoundException('Could not find product.');
    }

    return result;
  }

  async findName(name: string): Promise<CreateProductDto[]> {
    const result = await Product.findAll({
      attributes: [
        'id',
        'name',
        'price',
        'cat_id',
        [Product.sequelize.col('Category.name'), 'cat_name'],
        'createdAt',
        'updatedAt',
      ],
      where: { name: { [Op.like]: `%${name}%` } },
      include: { model: Category, attributes: [] },
    });
    if (!result) {
      throw new NotFoundException('Could not find product.');
    }

    return result;
  }

  async findPage(page: number, limit: number): Promise<CreateProductDto[]> {
    const result = await Product.findAll({
      attributes: [
        'id',
        'name',
        'price',
        'cat_id',
        [Product.sequelize.col('Category.name'), 'cat_name'],
        'createdAt',
        'updatedAt',
      ],
      offset: (page - 1) * limit,
      limit: limit,
      include: { model: Category, attributes: [] },
    });
    if (!result) {
      throw new NotFoundException('Could not find product.');
    }

    return result;
  }

  async create(createProductDto: CreateProductDto): Promise<CreateProductDto> {
    if (!(await isValidCategory(createProductDto.cat_id))) {
      throw new BadRequestException('Category does not exist.');
    }

    return Product.create(createProductDto);
  }

  async bulkCreate(
    createProductDto: CreateProductDto[],
  ): Promise<CreateProductDto[]> {
    const category_ids = await Category.findAll({
      attributes: ['id'],
    });

    createProductDto.forEach((product) => {
      if (!category_ids.some((id) => id.id === product.cat_id)) {
        throw new BadRequestException(
          `Product ${product.name} has invalid category id ${product.cat_id}.`,
        );
      }
    });

    return Product.bulkCreate(createProductDto);
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<CreateProductDto> {
    if (!(await isValidCategory(updateProductDto.cat_id))) {
      throw new BadRequestException('Category does not exist.');
    }

    const product = await Product.findOne({
      where: {
        id: id,
      },
    });
    product.name = updateProductDto.name || product.name;
    product.price = updateProductDto.price || product.price;
    product.cat_id = updateProductDto.cat_id || product.cat_id;

    return product.save();
  }

  async remove(id: number): Promise<CreateProductDto> {
    const product = await Product.findOne({
      where: {
        id: id,
      },
    });
    product.destroy();

    return product;
  }
}
