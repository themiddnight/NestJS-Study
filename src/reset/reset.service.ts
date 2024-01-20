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
    await Category.destroy({ truncate: true, cascade: true });
    await Category.sequelize.query(
      'UPDATE sqlite_sequence SET seq=0 WHERE NAME="Categories"',
    );
    await Product.destroy({ truncate: true, cascade: true });
    await Product.sequelize.query(
      'UPDATE sqlite_sequence SET seq=0 WHERE NAME="Products"',
    );
    await Review.destroy({ truncate: true, cascade: true });
    await Review.sequelize.query(
      'UPDATE sqlite_sequence SET seq=0 WHERE NAME="Reviews"',
    );
    await Category.bulkCreate(defaultCatagories);
    await Product.bulkCreate(defaultProducts);
    await Review.bulkCreate(defailtReviews);
    return { message: 'Reset successfully' };
  }
}
