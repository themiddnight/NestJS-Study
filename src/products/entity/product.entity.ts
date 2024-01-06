import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Product extends Model<Product> {
  @Column
  title: string;

  @Column
  description: string;

  @Column
  price: number;

  @Column
  category_id: number;
}
