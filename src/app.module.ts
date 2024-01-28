import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
import { LoggerMiddleware } from './logger/logger.middleware';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRoot({
      // dialect: 'sqlite',
      // storage: 'data/db.sqlite',
      dialect: 'postgres',
      host: process.env.DB_POSTGRES_HOST,
      port: parseInt(process.env.DB_POSTGRES_PORT),
      username: process.env.DB_POSTGRES_USER,
      password: process.env.DB_POSTGRES_PASSWORD,
      database: process.env.DB_POSTGRES_DATABASE,
      autoLoadModels: true,
      synchronize: true,
      logging: false,
      // sync: { force: true },
      models: [Product, Category, Review],
    }),
    ProductsModule,
    CategoryModule,
    ResetModule,
    ReviewsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
