import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';

import { ProductsModule } from './products/products.module';
import { CategoryModule } from './category/category.module';

import { Product } from './products/models/product.model';
import { Category } from './category/models/category.model';
import { ResetModule } from './reset/reset.module';

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
      models: [Product, Category],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ProductsModule,
    CategoryModule,
    ResetModule,
  ],
})
export class AppModule {}
