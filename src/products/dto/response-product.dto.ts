export class ResponseProductsDto {
  product_id: number;
  name: string;
  price: number;
  image_url: string;
  category_id: number;
  category: string;
  avg_rating: number;
  review_count: number;
}

export class ResponseProductDto {
  product_id: number;
  name: string;
  description: string;
  price: number;
  category_id: number;
  image_url: string;
  category: string;
  avg_rating: number;
  review_count: number;
  createdAt: Date;
  updatedAt: Date;
}
