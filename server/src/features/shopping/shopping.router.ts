import { Router } from 'express';
import { ShoppingController } from './shopping.controller.js';

export class ShoppingRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new ShoppingController();

    // Define las rutas basándonos en las acciones de los botones del Frontend (Crear, Ver, Eliminar)
    router.post('/', controller.create);      // Confirmar Pedido (1.jpeg)
    router.get('/', controller.getAll);       // Listar Pedidos Registrados
    router.get('/:id', controller.getById);   // Ver detalle del pedido (Modal de 2.jpeg)
    router.delete('/:id', controller.delete); // Eliminar pedido (Botón rojo en 2.jpeg)

    return router;
  }
}