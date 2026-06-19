import type { PurchaseEntity } from './entities/shopping.entity.js';

export class PurchaseRepository {
  private static purchases: PurchaseEntity[] = [];

  async create(purchase: PurchaseEntity): Promise<PurchaseEntity> {
    PurchaseRepository.purchases.push(purchase);
    return purchase;
  }

  async findAll(): Promise<PurchaseEntity[]> {
    return PurchaseRepository.purchases.filter(p => p.active);
  }

  async findById(id: string): Promise<PurchaseEntity | null> {
    const purchase = PurchaseRepository.purchases.find(p => p.id === id && p.active);
    return purchase || null;
  }

  async updateInvoice(id: string, invoiceNumber: string): Promise<PurchaseEntity | null> {
    const purchase = PurchaseRepository.purchases.find(p => p.id === id && p.active);
    if (!purchase) return null;
    purchase.invoiceNumber = invoiceNumber;
    return purchase;
  }

  async softDelete(id: string): Promise<boolean> {
    const purchase = PurchaseRepository.purchases.find(p => p.id === id && p.active);
    if (!purchase) return false;

    purchase.active = false;
    return true;
  }
}