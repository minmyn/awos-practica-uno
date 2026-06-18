import { type Request, type Response } from 'express';
import { SupplierService } from './supplier.service.js';
import type { CreateSupplierDto } from './dtos/create-supplier.dto.js';
import type { SupplierResponseDto } from './dtos/supplier-response.dto.js';
import type { UpdateSupplierDto } from './dtos/update-supplier.dto.js';

export class SupplierController {
  constructor(private supplierService: SupplierService) {}

  getSuppliers = async (_req: Request, res: Response): Promise<void> => {
    try {
      const suppliers: SupplierResponseDto[] = await this.supplierService.getAllSuppliers();
      res.status(200).json(suppliers);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  createSupplier = async (req: Request, res: Response): Promise<void> => {
    try {
      const dto: CreateSupplierDto = req.body;

      if (!dto.name || !dto.phone || !dto.zipCode) {
        res.status(400).json({ message: 'Todos los campos (name, phone, zipCode) son requeridos.' });
        return;
      }

      const newSupplier: SupplierResponseDto = await this.supplierService.createSupplier(dto);
      res.status(201).json(newSupplier);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  updateSupplier = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const dto: UpdateSupplierDto = req.body;

      if (!id) {
        res.status(400).json({ message: 'El ID del proveedor es requerido.' });
        return;
      }

      if (Object.keys(dto).length === 0) {
        res.status(400).json({ message: 'Al menos un campo debe enviarse para actualizar.' });
        return;
      }

      const updatedSupplier = await this.supplierService.updateSupplier(String(id), dto);
      res.status(200).json(updatedSupplier);
    } catch (error: any) {
      const statusCode = error.message === 'Proveedor no encontrado' ? 404 : 400;
      res.status(statusCode).json({ message: error.message });
    }
  };

}