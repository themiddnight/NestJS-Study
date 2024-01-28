import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Op } from 'sequelize';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './models/product.model';
import { Category } from 'src/category/models/category.model';

@Injectable()
export class ProductsService {
  async findAll(
    name: string,
    category_id: number,
    page: number,
    limit: number,
  ) {
    const whereCondition: any = {};
    if (name) {
      whereCondition.name = { [Op.like]: `%${name}%` };
    }
    if (category_id) {
      whereCondition.category_id = category_id;
    }
    page = page || 1;
    limit = limit || 10;
    const productCount = await Product.count({
      where: whereCondition,
    });
    // Todo: query avg_rating and review_count
    const result = await Product.findAll({
      attributes: { exclude: ['description', 'createdAt', 'updatedAt'] },
      where: whereCondition,
      offset: (page - 1) * limit,
      limit: limit,
      include: [
        {
          model: Category,
          attributes: ['name'],
          required: true,
        },
      ],
      raw: true,
    });
    // const [result] = await Product.sequelize.query(`
    //   select
    //     p.product_id, p.name, p.price, p.category_id, p.image_url,
    //     c.name category,
    //     round(avg(r.rating),2) avg_rating,
    //     count(r.rating) review_count
    //   from "Products" p
    //   join "Categories" c on p.category_id = c.category_id
    //   join "Reviews" r on p.product_id = r.product_id
    //   group by p.product_id, c.name;`);
    if (result.length === 0) {
      throw new NotFoundException({
        message: 'Could not find products.',
        data: [],
      });
    }
    // result.forEach((product: any) => {
    //   product.price = Number(product.price);
    //   product.avg_rating = Number(product.avg_rating);
    //   product.review_count = Number(product.review_count);
    // });
    return {
      message: 'Success',
      current_page: page,
      total_pages: Math.ceil(productCount / limit),
      data: result,
    };
  }

  async findOne(id: number) {
    // Todo: query avg_rating and review_count
    const result = await Product.findOne({
      where: { product_id: id },
      include: [
        {
          model: Category,
          attributes: ['name'],
          required: true,
        },
      ],
      raw: true,
    });
    // const [result] = await Product.sequelize.query(`
    //   select
    //     p.*, c.name category,
    //     round(avg(r.rating),2) avg_rating,
    //     count(r.rating) review_count
    //   from "Products" p
    //   join "Categories" c on p.category_id = c.category_id
    //   join "Reviews" r on p.product_id = r.product_id
    //   where p.product_id = ${id}
    //   group by p.product_id, c.name;`);
    if (!result) {
      throw new NotFoundException({
        message: `Could not find product with id ${id}.`,
        data: {},
      });
    }
    // result.forEach((product: any) => {
    //   product.price = Number(product.price);
    //   product.avg_rating = Number(product.avg_rating);
    //   product.review_count = Number(product.review_count);
    // });
    return {
      message: 'Success',
      data: result,
    };
  }

  async create(createProductDto: CreateProductDto) {
    try {
      const result = await Product.create(createProductDto);
      return {
        message: `Product with id ${result.product_id} has been created.`,
        data: result,
      };
    } catch (error) {
      throw new BadRequestException({
        message: error.message,
        data: {},
      });
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const result = await Product.update(updateProductDto, {
      where: { product_id: id },
    });
    if (result[0] === 0) {
      throw new NotFoundException({
        message: `Could not find product with id ${id}.`,
      });
    }
    return {
      message: `Product with id ${id} has been updated.`,
    };
  }

  async remove(id: number) {
    const result = await Product.destroy({ where: { product_id: id } });
    if (!result) {
      throw new NotFoundException({
        message: `Could not find product with id ${id}.`,
      });
    }
    return {
      message: `Product with id ${id} has been deleted.`,
    };
  }
}
