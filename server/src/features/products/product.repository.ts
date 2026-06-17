import type { ProductEntity } from './entities/product.entity.js';
import type { CreateProductDto } from './dtos/create-product.dto.js';
import type { UpdateProductDto } from './dtos/update-product.dto.js';

export class ProductRepository {
  private static products: ProductEntity[] = [];

  async findAll(): Promise<ProductEntity[]> {
    return ProductRepository.products.filter(p => p.active);
  }

  async findById(id: string): Promise<ProductEntity | null> {
    const product = ProductRepository.products.find(p => p.id === id && p.active);
    return product || null;
  }

  async findByName(name: string): Promise<ProductEntity | null> {
    const product = ProductRepository.products.find(
      p => p.name.toLowerCase() === name.toLowerCase() && p.active
    );
    return product || null;
  }

  async create(dto: CreateProductDto): Promise<ProductEntity> {
    const newProduct: ProductEntity = {
      id: crypto.randomUUID(),
      name: dto.name,
      price: dto.price,
      minStock: dto.minStock,
      inStock: dto.inStock || 0,
      barcode: dto.barcode,
      categoryId: dto.categoryId,
      active: true
    };
    ProductRepository.products.push(newProduct);
    return newProduct;
  }

  async update(id: string, dto: UpdateProductDto): Promise<ProductEntity | null> {
    const product = ProductRepository.products.find(p => p.id === id && p.active);
    if (!product) return null;

    if (dto.name !== undefined) product.name = dto.name;
    if (dto.price !== undefined) product.price = dto.price;
    if (dto.minStock !== undefined) product.minStock = dto.minStock;
    if (dto.inStock !== undefined) product.inStock = dto.inStock;
    if (dto.barcode !== undefined) product.barcode = dto.barcode;
    if (dto.categoryId !== undefined) product.categoryId = dto.categoryId;

    return product;
  }

  async softDelete(id: string): Promise<boolean> {
    const product = ProductRepository.products.find(p => p.id === id && p.active);
    if (!product) return false;

    product.active = false;
    product.inStock = 0;
    return true;
  }
}