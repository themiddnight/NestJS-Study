import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './models/category.model';

@Injectable()
export class CategoryService {
  async findAll() {
    const result = await Category.findAll({
      attributes: ['category_id', 'name'],
    });
    if (result.length === 0) {
      throw new NotFoundException({
        message: 'Could not find categories.',
        data: [],
      });
    }
    return {
      message: 'Success',
      data: result,
    };
  }

  async findOne(id: number) {
    const result = await Category.findOne({
      where: {
        category_id: id,
      },
    });
    if (!result) {
      throw new NotFoundException({
        message: `Could not find category with id ${id}.`,
        data: {},
      });
    }
    return {
      message: 'Success',
      data: result,
    };
  }

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const result = await Category.create(createCategoryDto);
      return {
        message: `Category with id ${result.category_id} has been created.`,
        data: result,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await Category.findOne({ where: { category_id: id } });
    if (!category) {
      throw new NotFoundException('Could not find category.');
    }
    category.name = updateCategoryDto.name;
    try {
      await category.save();
      return {
        message: `Category with id ${id} has been updated.`,
        data: category,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: number) {
    const category = await Category.findOne({ where: { category_id: id } });
    if (!category) {
      throw new NotFoundException('Could not find category.');
    }
    category.destroy();
    return {
      message: `Category with id ${id} has been deleted.`,
    };
  }
}
