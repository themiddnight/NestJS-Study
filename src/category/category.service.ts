import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

import { InjectModel } from '@nestjs/sequelize';
import { Category } from './models/category.model';
import { Product } from 'src/products/models/product.model';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category)
    private categoryModel: typeof Category,
  ) {}

  async findAll() {
    return this.categoryModel.findAll();
  }

  async findOne(id: number) {
    return this.categoryModel.findOne({
      where: {
        id: id,
      },
    });
  }

  async findProducts(id: number) {
    return this.categoryModel.findOne({
      include: [Product],
      where: {
        id: id,
      },
    });
  }

  async bulkCreate(createCategoryDto: CreateCategoryDto[]) {
    return this.categoryModel.bulkCreate(createCategoryDto);
  }

  async create(createCategoryDto: CreateCategoryDto) {
    const category = new Category();
    category.name = createCategoryDto.name;
    return category.save();
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryModel.findOne({
      where: {
        id: id,
      },
    });
    category.name = updateCategoryDto.name;
  }

  async remove(id: number) {
    const category = await this.categoryModel.findOne({
      where: {
        id: id,
      },
    });
    category.destroy();
  }
}
