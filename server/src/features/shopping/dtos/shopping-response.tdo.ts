export interface ShoppingResponseDto {
  id: string;
  productId: string;
  productName: string; // Para que el front pueda pintar el nombre "leche" sin hacer otra petición
  quantity: number;
  displayFormat: string; // Aquí guardamos el texto formateado: "leche - 1 piezas" que pide tu diseño
  createdAt: string;
}