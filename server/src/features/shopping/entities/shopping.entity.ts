export interface ShoppingEntity {
  id: string;
  productId: string;
  quantity: number;
  userId?: string;     // Opcional: Para saber si lo compró el cliente (Juan Pérez) o el admin
  createdAt: string;   // Fecha de creación del pedido en formato string/ISO
}