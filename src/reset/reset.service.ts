import { Injectable } from '@nestjs/common';

import { defaultCatagories, defaultProducts } from 'data/defaultData';
import { Category } from '../category/models/category.model';
import { Product } from '../products/models/product.model';

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
    await Category.bulkCreate(defaultCatagories);
    await Product.bulkCreate(defaultProducts);
    return { message: 'Reset successfully' };
  }
}
