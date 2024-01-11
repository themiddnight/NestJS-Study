import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

/**
 * Formats the response from the query -
 * Merge the category.name property into the product object.
 */
@Injectable()
export class FormatProductResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle().pipe(
      map((products) => {
        if (Array.isArray(products)) {
          return products.map((product) => this.formatProduct(product));
        }
        return this.formatProduct(products);
      }),
    );
  }

  formatProduct(product) {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      cat_id: product.cat_id,
      category: product.category.name,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }
}
