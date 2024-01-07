import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';

import { ProductsModule } from './products/products.module';
import { CategoryModule } from './category/category.module';

import { Product } from './products/models/product.model';
import { Category } from './category/models/category.model';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: 'data/db.sqlite',
      autoLoadModels: true,
      synchronize: true,
      models: [Product, Category],
    }),
    ProductsModule,
    CategoryModule,
  ],
})
export class AppModule {}
