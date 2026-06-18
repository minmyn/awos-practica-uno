import type { CatalogItemEntity } from './entities/catalog.entity.js';
import type { CreateCatalogDto } from './dtos/create-catalog.dto.js';

export class CatalogRepository {
  private items: CatalogItemEntity[] = [];

  async findAll(): Promise<CatalogItemEntity[]> {
    return this.items;
  }

  async create(dto: CreateCatalogDto): Promise<CatalogItemEntity> {
    const newItem: CatalogItemEntity = {
      id: crypto.randomUUID(),
      name: dto.name,
      description: dto.description,
      price: dto.price
    };
    this.items.push(newItem);
    return newItem;
  }

  async update(id: string, dto: CreateCatalogDto): Promise<CatalogItemEntity | null> {
    const index = this.items.findIndex(item => item.id === id);
    if (index === -1) {
      return null;
    }
    const existingItem = this.items[index]!;
    const updatedItem: CatalogItemEntity = {
      ...existingItem,
      ...dto,
      id: existingItem.id
    };
    this.items[index] = updatedItem;
    return updatedItem;
  }

  async delete(id: string): Promise<boolean> {
    const initialLength = this.items.length;
    this.items = this.items.filter(item => item.id !== id);
    return this.items.length < initialLength;
  }
}
