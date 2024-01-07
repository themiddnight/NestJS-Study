import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

import { Category } from './models/category.model';
import { Product } from '../products/models/product.model';

@Injectable()
export class CategoryService {
  async findAll() {
    return Category.findAll();
  }

  async findOne(id: number) {
    return Category.findOne({
      where: {
        id: id,
      },
    });
  }

  async findProducts(id: number) {
    return Category.findOne({
      include: [Product],
      where: {
        id: id,
      },
    });
  }

  async bulkCreate(createCategoryDto: CreateCategoryDto[]) {
    return Category.bulkCreate(createCategoryDto);
  }

  async create(createCategoryDto: CreateCategoryDto) {
    const category = new Category();
    category.name = createCategoryDto.name;
    return category.save();
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await Category.findOne({
      where: {
        id: id,
      },
    });
    category.name = updateCategoryDto.name;
  }

  async remove(id: number) {
    const category = await Category.findOne({
      where: {
        id: id,
      },
    });
    category.destroy();
  }
}
