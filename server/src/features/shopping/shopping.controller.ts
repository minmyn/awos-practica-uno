import type { Request, Response } from 'express';
import { ShoppingService } from './shopping.service.js';

export class ShoppingController {
  constructor(private readonly shoppingService = new ShoppingService()) {}

  // POST /server/features/shopping
  public create = async (req: Request, res: Response) => {
    try {
      const { productId, quantity, userId } = req.body;

      if (!productId || typeof productId !== 'string') {
        res.status(400).json({
          code: 'BAD_REQUEST_STRUCTURE',
          message: 'productId es requerido y debe ser una cadena.'
        });
        return;
      }

      if (quantity === undefined || typeof quantity !== 'number' || quantity <= 0) {
        res.status(400).json({
          code: 'BAD_REQUEST_STRUCTURE',
          message: 'Quantity es requerido y debe ser un número mayor a cero.'
        });
        return;
      }

      const newOrder = await this.shoppingService.createOrder({ productId, quantity, userId });
      return res.status(201).json(newOrder);
    } catch (error: any) {
      if (error.message.toLowerCase().includes('not found')) {
        res.status(404).json({
          code: 'RESOURCE_NOT_FOUND',
          message: 'El producto asociado no existe.'
        });
        return;
      }

      return res.status(422).json({
        code: 'UNPROCESSABLE_ENTITY',
        message: error.message
      });
    }
  };

  // GET /server/features/shopping
  public getAll = async (_req: Request, res: Response) => {
    try {
      const orders = await this.shoppingService.getAllOrders();
      return res.status(200).json(orders);
    } catch (error: any) {
      return res.status(500).json({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Ocurrió un error inesperado.',
        details: { error: error.message }
      });
    }
  };

  // GET /server/features/shopping/:id
  public getById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      if (typeof id !== 'string') {
        res.status(400).json({
          code: 'BAD_REQUEST_STRUCTURE',
          message: 'ID inválido.'
        });
        return;
      }

      const order = await this.shoppingService.getOrderById(id);
      if (!order) {
        return res.status(404).json({
          code: 'RESOURCE_NOT_FOUND',
          message: 'El pedido solicitado no existe.'
        });
      }
      return res.status(200).json(order);
    } catch (error: any) {
      return res.status(500).json({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Ocurrió un error inesperado.',
        details: { error: error.message }
      });
    }
  };

  // DELETE /server/features/shopping/:id
  public delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      if (typeof id !== 'string') {
        res.status(400).json({
          code: 'BAD_REQUEST_STRUCTURE',
          message: 'ID inválido.'
        });
        return;
      }

      const wasDeleted = await this.shoppingService.deleteOrder(id);
      if (!wasDeleted) {
        return res.status(404).json({
          code: 'RESOURCE_NOT_FOUND',
          message: 'El pedido no existe o ya fue eliminado.'
        });
      }
      return res.status(200).json({
        code: 'RESOURCE_DELETED',
        message: 'Pedido eliminado correctamente.'
      });
    } catch (error: any) {
      return res.status(500).json({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Ocurrió un error inesperado.',
        details: { error: error.message }
      });
    }
  };
}