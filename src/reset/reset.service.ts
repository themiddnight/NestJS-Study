/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

import {
  defaultCatagories,
  defaultProducts,
  defailtReviews,
} from 'data/defaultData';
import { Category } from '../category/models/category.model';
import { Product } from '../products/models/product.model';
import { Review } from 'src/reviews/models/review.model';

@Injectable()
export class ResetService {
  async reset(reset: boolean) {
    if (!reset) {
      return { message: 'Reset is not requested' };
    }
    try {
      await Review.destroy({ where: {} });
      await Product.destroy({ where: {} });
      await Category.destroy({ where: {} });
      await Review.sequelize.query('ALTER SEQUENCE "Reviews_review_id_seq" RESTART WITH 1');
      await Product.sequelize.query('ALTER SEQUENCE "Products_product_id_seq" RESTART WITH 1');
      await Category.sequelize.query('ALTER SEQUENCE "Categories_category_id_seq" RESTART WITH 1');
      // for sqlite
      // await Review.sequelize.query('UPDATE sqlite_sequence SET seq=0 WHERE NAME="Reviews"');
      // await Product.sequelize.query('UPDATE sqlite_sequence SET seq=0 WHERE NAME="Products"');
      // await Category.sequelize.query('UPDATE sqlite_sequence SET seq=0 WHERE NAME="Categories"');
      await Category.bulkCreate(defaultCatagories);
      await Product.bulkCreate(defaultProducts);
      await Review.bulkCreate(defailtReviews);
      return { message: 'Reset successfully' };
    } catch (error) {
      return { message: 'Reset failed', error: error };
    }
  }
}
