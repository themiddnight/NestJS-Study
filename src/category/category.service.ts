import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {
  ResponseCategoriesDto,
  ResponseCategoryDto,
} from './dto/response-category.dto';
import { Category } from './models/category.model';

@Injectable()
export class CategoryService {
  async findAll(): Promise<ResponseCategoriesDto> {
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

  async findOne(id: number): Promise<ResponseCategoryDto> {
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
    const category = await Category.findOne({ where: { category_id: id } });
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
    const category = await Category.findOne({ where: { category_id: id } });
    if (!category) {
      throw new NotFoundException('Could not find category.');
    }
    category.destroy();
    return category;
  }
}
