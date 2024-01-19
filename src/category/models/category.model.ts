import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Product } from '../../products/models/product.model';
import { ApiProperty } from '@nestjs/swagger';

@Table
export class Category extends Model<Category> {
  @ApiProperty()
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  category_id: number;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @HasMany(() => Product)
  products: Product[];
}
