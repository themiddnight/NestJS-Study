import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Product } from 'src/products/models/product.model';

@Table
export class Category extends Model<Category> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @HasMany(() => Product)
  products: Product[];
}
