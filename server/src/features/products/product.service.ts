import { ProductRepository } from './product.repository.js';
import type { CreateProductDto } from './dtos/create-product.dto.js';
import type { UpdateProductDto } from './dtos/update-product.dto.js';
import type { ProductResponseDto } from './dtos/product-response.dto.js';
import type { ProductEntity } from './entities/product.entity.js';

export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  async getProducts(search?: string): Promise<ProductResponseDto[]> {
    let products = await this.productRepository.findAll();

    if (search) {
      const query = search.toLowerCase();
      products = products.filter(p => 
        p.name.toLowerCase().includes(query) || p.barcode.includes(query)
      );
    }

    return products.map(p => this.toResponseDto(p));
  }

  async getProductById(id: string): Promise<ProductResponseDto> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new Error('PRODUCT_NOT_FOUND');
    }
    return this.toResponseDto(product);
  }

  async createProduct(dto: CreateProductDto): Promise<ProductResponseDto> {
    if (dto.price <= 0) {
      throw new Error('INVALID_PRICE');
    }

    const existingProduct = await this.productRepository.findByName(dto.name);
    if (existingProduct) {
      throw new Error('PRODUCT_ALREADY_EXISTS');
    }

    const newEntity = await this.productRepository.create(dto);
    return this.toResponseDto(newEntity);
  }

  async updateProduct(id: string, dto: UpdateProductDto): Promise<ProductResponseDto> {
    if (dto.price !== undefined && dto.price <= 0) {
      throw new Error('INVALID_PRICE');
    }

    const updatedEntity = await this.productRepository.update(id, dto);
    if (!updatedEntity) {
      throw new Error('PRODUCT_NOT_FOUND');
    }

    return this.toResponseDto(updatedEntity);
  }

  async removeProduct(id: string): Promise<void> {
    const success = await this.productRepository.softDelete(id);
    if (!success) {
      throw new Error('PRODUCT_NOT_FOUND');
    }
  }

  private toResponseDto(entity: ProductEntity): ProductResponseDto {
    return {
      id: entity.id,
      name: entity.name,
      price: entity.price,
      minStock: entity.minStock,
      inStock: entity.inStock,
      barcode: entity.barcode,
      categoryId: entity.categoryId,
      stockStatus: entity.inStock <= entity.minStock ? 'LOW_STOCK' : 'OK'
    };
  }
}