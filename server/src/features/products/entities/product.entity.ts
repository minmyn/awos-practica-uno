export interface ProductEntity {
  id: string;
  name: string;
  price: number;
  minStock: number;
  inStock: number;
  barcode: string;
  categoryId: string;
  active: boolean;
}