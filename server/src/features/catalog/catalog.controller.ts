import { type Request, type Response } from 'express';
import { CatalogService } from './catalog.service.js';
import type { CreateCatalogDto } from './dtos/create-catalog.dto.js';
import type { CatalogResponseDto } from './dtos/catalog-response.dto.js';

export class CatalogController {
  constructor(private catalogService: CatalogService) {}

  getItems = async (_req: Request, res: Response): Promise<void> => {
    try {
      const items: CatalogResponseDto[] = await this.catalogService.getAllItems();
      res.status(200).json(items);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  createItem = async (req: Request, res: Response): Promise<void> => {
    try {
      const dto: CreateCatalogDto = req.body;
      
      if (!dto.name) {
        res.status(400).json({ message: 'El nombre es obligatorio.' });
        return;
      }

      const newItem = await this.catalogService.createItem(dto);
      res.status(201).json(newItem);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  updateItem = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      if (!id || Array.isArray(id)) {
        res.status(400).json({ message: 'ID inválido.' });
        return;
      }
      const dto: CreateCatalogDto = req.body;
      const updatedItem = await this.catalogService.updateItem(id, dto);
      if (!updatedItem) {
        res.status(404).json({ message: 'Elemento no encontrado.' });
        return;
      }
      res.status(200).json(updatedItem);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  deleteItem = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      if (!id || Array.isArray(id)) {
        res.status(400).json({ message: 'ID inválido.' });
        return;
      }
      const deleted = await this.catalogService.deleteItem(id);
      if (!deleted) {
        res.status(404).json({ message: 'Elemento no encontrado.' });
        return;
      }
      res.status(200).json({ message: 'Elemento eliminado correctamente.' });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };
}