import { SupplierRepository } from './supplier.repository.js';
import type { CreateSupplierDto } from './dtos/create-supplier.dto.js';
import type { SupplierResponseDto } from './dtos/supplier-response.dto.js';
import type { SupplierEntity } from './entities/supplier.entity.js';
import type { UpdateSupplierDto } from './dtos/update-supplier.dto.js';

export class SupplierService {
  constructor(private supplierRepository: SupplierRepository) {}

  async getAllSuppliers(): Promise<SupplierResponseDto[]> {
    const entities = await this.supplierRepository.findAll();
    return entities.map(entity => this.toResponseDto(entity));
  }

  async createSupplier(dto: CreateSupplierDto): Promise<SupplierResponseDto> {
    if (dto.phone.length < 10) {
      throw new Error('El phone debe tener al menos 10 dígitos');
    }

    const entity = await this.supplierRepository.create(dto);
    return this.toResponseDto(entity);
  }

  async updateSupplier(id: string, dto: UpdateSupplierDto): Promise<SupplierResponseDto> {

    if (dto.phone !== undefined && dto.phone.length < 10) {
      throw new Error('El phone debe tener al menos 10 dígitos si se proporciona');
    }

    const updatedEntity = await this.supplierRepository.update(id, dto);
    if (!updatedEntity) {
      throw new Error('Proveedor no encontrado');
    }

    return this.toResponseDto(updatedEntity);
  }

  private toResponseDto(entity: SupplierEntity): SupplierResponseDto {
    return {
      id: entity.id,
      name: entity.name,
      phone: entity.phone,
      zipCode: entity.zipCode
    };
  }

}