import { type Request, type Response } from 'express';
import { ProductService } from './product.service.js';
import type { CreateProductDto } from './dtos/create-product.dto.js';
import type { UpdateProductDto } from './dtos/update-product.dto.js';

export class ProductController {
  constructor(private productService: ProductService) {}

  getProducts = async (req: Request, res: Response): Promise<void> => {
    try {
      const search = req.query.search as string | undefined;
      const data = await this.productService.getProducts(search);
      
      res.status(200).json({
        data,
        meta: {
          total: data.length
        }
      });

    } catch (error: any) {
      res.status(500).json({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Ocurrió un error inesperado.',
        details: { error: error.message }
      });
    }
  };

  getProductById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      if (typeof id !== 'string') {
        res.status(400).json({ 
            code: 'BAD_REQUEST_STRUCTURE', 
            message: 'ID inválido.' 
        });
        return;
      }

      const product = await this.productService.getProductById(id);
      res.status(200).json(product);
    } catch (error: any) {
      if (error.message === 'PRODUCT_NOT_FOUND') {
        res.status(404).json({
          code: 'ARTICLE_NOT_FOUND',
          message: 'El artículo solicitado no existe o fue removido lógicamente.',
          details: { searchedId: req.params.id }
        });
        return;
      }
      res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
    }
  };

  createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const dto: CreateProductDto = req.body;

      if (!dto.name || dto.price === undefined) {
        res.status(400).json({
          code: 'BAD_REQUEST_STRUCTURE',
          message: 'Todos los campos obligatorios (name, price, minStock, barcode, categoryId) son requeridos.'
        });
        return;
      }

      const newProduct = await this.productService.createProduct(dto);
      res.status(201).json(newProduct);
    } catch (error: any) {
      if (error.message === 'PRODUCT_ALREADY_EXISTS') {
        res.status(409).json({
          code: 'RESOURCE_ALREADY_EXISTS',
          message: 'Conflicto de unicidad de datos en la persistencia del sistema.',
          details: { conflictingField: 'name', conflictingValue: req.body.name }
        });
        return;
      }
      res.status(422).json({ 
        code: 'UNPROCESSABLE_ENTITY', 
        message: error.message });
    }
  };

  updateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const dto: UpdateProductDto = req.body;

      if (typeof id !== 'string') {
        res.status(400).json({ 
            code: 'BAD_REQUEST_STRUCTURE', 
            message: 'ID inválido.' });
        return;
      }

      const updated = await this.productService.updateProduct(id, dto);
      res.status(200).json(updated);
    } catch (error: any) {
      const status = error.message === 'PRODUCT_NOT_FOUND' ? 404 : 422;
      res.status(status).json({
        code: status === 404 ? 'ARTICLE_NOT_FOUND' : 'UNPROCESSABLE_ENTITY',
        message: error.message
      });
    }
  };

  deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      if (typeof id !== 'string') {
        res.status(400).json({ code: 'BAD_REQUEST_STRUCTURE', message: 'ID inválido.' });
        return;
      }

      await this.productService.removeProduct(id);
      res.status(204).send();
    } catch (error: any) {
      res.status(404).json({
        code: 'ARTICLE_NOT_FOUND',
        message: 'El producto no existe o ya fue eliminado.'
      });
    }
  };
}