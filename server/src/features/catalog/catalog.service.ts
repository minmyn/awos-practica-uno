import { CatalogRepository } from './catalog.repository.js';
import type { CreateCatalogDto } from './dtos/create-catalog.dto.js';
import type { CatalogItemEntity } from './entities/catalog.entity.js';
import type { CatalogResponseDto } from './dtos/catalog-response.dto.js';

export class CatalogService {
  constructor(private catalogRepository: CatalogRepository) {}

  async getAllItems(): Promise<CatalogResponseDto[]> {
    const entities = await this.catalogRepository.findAll();
    return entities.map(entity => this.toResponseDto(entity));
  }

  async createItem(dto: CreateCatalogDto): Promise<CatalogItemEntity> {
    if (dto.price <= 0) {
      throw new Error('El precio debe ser mayor a cero.');
    }
    return await this.catalogRepository.create(dto);
  }

  private toResponseDto(entity: CatalogItemEntity): CatalogResponseDto {
    return {
      id: entity.id,
      name: entity.name,
    };
  }
}