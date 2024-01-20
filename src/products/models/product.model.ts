import { ApiProperty } from '@nestjs/swagger';
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { Category } from 'src/category/models/category.model';
import { Review } from 'src/reviews/models/review.model';

@Table
export class Product extends Model<Product> {
  @ApiProperty()
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  product_id: number;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;

  @ApiProperty()
  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
  })
  price: number;

  @ApiProperty()
  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  category_id: number;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  image_url: string;

  @ApiProperty()
  @BelongsTo(() => Category, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  category: Category;

  @HasMany(() => Review)
  reviews: Review[];
}
