export interface ProductResponseDto {
  id: string;
  name: string;
  price: number;
  minStock: number;
  inStock: number;
  barcode: string;
  categoryId: string;
  stockStatus: 'OK' | 'LOW_STOCK';
}