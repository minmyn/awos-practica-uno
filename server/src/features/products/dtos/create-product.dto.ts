export interface CreateProductDto {
  name: string;
  price: number;
  minStock: number;
  inStock: number;
  barcode: string;
  categoryId: string;
}