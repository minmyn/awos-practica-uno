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
      name: dto.name
    };
    this.items.push(newItem);
    return newItem;
  }
}
