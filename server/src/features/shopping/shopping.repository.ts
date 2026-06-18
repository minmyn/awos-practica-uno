import type { ShoppingEntity } from './entities/shopping.entity.js';

// Simularemos una base de datos en memoria dinámica. 
// Si usas MySQL o PostgreSQL, aquí inyectas tu conexión/pool.
const shoppingDatabase: ShoppingEntity[] = [];

export class ShoppingRepository {
  
  async create(shopping: ShoppingEntity): Promise<ShoppingEntity> {
    shoppingDatabase.push(shopping);
    return shopping;
  }

  async findAll(): Promise<ShoppingEntity[]> {
    return [...shoppingDatabase];
  }

  async findByUserId(userId: string): Promise<ShoppingEntity[]> {
    return shoppingDatabase.filter(item => item.userId === userId);
  }

  async findById(id: string): Promise<ShoppingEntity | undefined> {
    return shoppingDatabase.find(item => item.id === id);
  }

  async delete(id: string): Promise<boolean> {
    const index = shoppingDatabase.findIndex(item => item.id === id);
    if (index === -1) return false;
    shoppingDatabase.splice(index, 1);
    return true;
  }
}