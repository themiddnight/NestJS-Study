import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Op } from 'sequelize';

import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './models/category.model';
import { Product } from '../products/models/product.model';

@Injectable()
export class CategoryService {
  async findAll(): Promise<CreateCategoryDto[]> {
    return await Category.findAll();
  }

  async findName(name: string): Promise<CreateCategoryDto[]> {
    const result = await Category.findAll({
      where: { name: { [Op.like]: `%${name}%` } },
    });
    if (!result) {
      throw new NotFoundException('Could not find category.');
    }
    return result;
  }

  async findOne(id: number): Promise<CreateCategoryDto> {
    const result = await Category.findOne({
      where: {
        id: id,
      },
    });
    if (!result) {
      throw new NotFoundException('Could not find category.');
    }
    return result;
  }

  async findProducts(id: number) {
    const result = await Category.findOne({
      include: [Product],
      where: {
        id: id,
      },
    });
    if (!result) {
      throw new NotFoundException('Could not find category.');
    }
    return result.products;
  }

  async bulkCreate(
    createCategoryDto: CreateCategoryDto[],
  ): Promise<Array<CreateCategoryDto>> {
    try {
      return await Category.bulkCreate(createCategoryDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async create(
    createCategoryDto: CreateCategoryDto,
  ): Promise<CreateCategoryDto> {
    try {
      return await Category.create(createCategoryDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<CreateCategoryDto> {
    const category = await Category.findOne({ where: { id: id } });
    if (!category) {
      throw new NotFoundException('Could not find category.');
    }
    category.name = updateCategoryDto.name;
    try {
      return await category.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: number): Promise<CreateCategoryDto> {
    const category = await Category.findOne({ where: { id: id } });
    if (!category) {
      throw new NotFoundException('Could not find category.');
    }
    category.destroy();
    return category;
  }
}
