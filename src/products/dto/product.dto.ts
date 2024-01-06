export interface RawProductDto {
  id: number;
  cat_id: number;
  name: string;
  price: number;
}

export interface ProductDto {
  id: number;
  cat_id: number;
  name: string;
  category: string;
  price: number;
}

export interface CategoryDto {
  id: number;
  name: string;
}
