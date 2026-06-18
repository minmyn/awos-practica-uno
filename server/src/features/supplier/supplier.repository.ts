import type { SupplierEntity } from './entities/supplier.entity.js';
import type { CreateSupplierDto } from './dtos/create-supplier.dto.js';
import type { UpdateSupplierDto } from './dtos/update-supplier.dto.js';

export class SupplierRepository {
  private static suppliers: SupplierEntity[] = [];

  async findAll(): Promise<SupplierEntity[]> {
    return SupplierRepository.suppliers;
  }

  async create(dto: CreateSupplierDto): Promise<SupplierEntity> {
    const newSupplier: SupplierEntity = {
      id: crypto.randomUUID(),
      name: dto.name,
      phone: dto.phone,
      zipCode: dto.zipCode
    };
    SupplierRepository.suppliers.push(newSupplier);
    return newSupplier;
  }

  async update(id: string, dto: UpdateSupplierDto): Promise<SupplierEntity | null> {
    const supplier = SupplierRepository.suppliers.find(s => s.id === id);
    if (!supplier) return null;

    if (dto.name !== undefined) supplier.name = dto.name;
    if (dto.phone !== undefined) supplier.phone = dto.phone;
    if (dto.zipCode !== undefined) supplier.zipCode = dto.zipCode;

    return supplier;
  }

}