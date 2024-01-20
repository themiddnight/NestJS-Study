import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';

import { ResetModule } from './reset/reset.module';
import { ProductsModule } from './products/products.module';
import { CategoryModule } from './category/category.module';
import { ReviewsModule } from './reviews/reviews.module';

import { Product } from './products/models/product.model';
import { Category } from './category/models/category.model';
import { Review } from './reviews/models/review.model';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: 'data/db.sqlite',
      autoLoadModels: true,
      synchronize: true,
      // sync: { force: true },
      models: [Product, Category, Review],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ProductsModule,
    CategoryModule,
    ResetModule,
    ReviewsModule,
  ],
})
export class AppModule {}
