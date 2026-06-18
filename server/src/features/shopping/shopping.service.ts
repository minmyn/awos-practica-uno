import { ShoppingRepository } from './shopping.repository.js';
import type { ShoppingEntity } from './entities/shopping.entity.js';
import type { CreateShoppingDto } from './dtos/create-shopping.dt.js';
import type { ShoppingResponseDto } from './dtos/shopping-response.tdo.js';

import { ProductRepository } from '../products/product.repository.js';

export class ShoppingService {
  constructor(
    private readonly shoppingRepository = new ShoppingRepository(),
    private readonly productRepository = new ProductRepository()
  ) {}

  // Mapeador privado para cumplir estrictamente con tu interfaz 'ShoppingResponseDto'
  private async toResponseDto(entity: ShoppingEntity): Promise<ShoppingResponseDto> {
    // Buscamos el producto en su respectivo módulo/repositorio
    const product = await this.productRepository.findById(entity.productId);
    const productName = product ? product.name : 'Producto Desconocido';

    return {
      id: entity.id,
      productId: entity.productId,
      productName: productName,
      quantity: entity.quantity,
      // Formato exacto que pide tu diseño en la vista de lista y modal
      displayFormat: `${productName} - ${entity.quantity} piezas`,
      createdAt: entity.createdAt,
    };
  }

  async createOrder(createDto: CreateShoppingDto): Promise<ShoppingResponseDto> {
    const product = await this.productRepository.findById(createDto.productId);
    if (!product) throw new Error(`Product with ID ${createDto.productId} not found`);

    // 2. Crear la entidad pura
    const newShopping: ShoppingEntity = {
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 11),
      productId: createDto.productId,
      quantity: createDto.quantity,
      userId: createDto.userId || 'Juan Pérez', // Default tomado de tu vista front (image_fe5f63.png / 1.jpeg)
      createdAt: new Date().toISOString(),
    };

    // 3. Persistir en repositorio
    const savedEntity = await this.shoppingRepository.create(newShopping);
    
    // 4. Retornar con el formato que espera el Front
    return this.toResponseDto(savedEntity);
  }

  async getAllOrders(): Promise<ShoppingResponseDto[]> {
    const entities = await this.shoppingRepository.findAll();
    return Promise.all(entities.map(entity => this.toResponseDto(entity)));
  }

  async getOrderById(id: string): Promise<ShoppingResponseDto | null> {
    const entity = await this.shoppingRepository.findById(id);
    if (!entity) return null;
    return this.toResponseDto(entity);
  }

  async deleteOrder(id: string): Promise<boolean> {
    return this.shoppingRepository.delete(id);
  }
}