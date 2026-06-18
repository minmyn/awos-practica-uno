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
}