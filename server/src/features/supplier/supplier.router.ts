import { Router } from 'express';
import { SupplierRepository } from './supplier.repository.js';
import { SupplierService } from './supplier.service.js';
import { SupplierController } from './supplier.controller.js';

const router = Router();

const repository = new SupplierRepository();
const service = new SupplierService(repository);
const controller = new SupplierController(service);

router.get('/', controller.getSuppliers);
router.post('/', controller.createSupplier);
router.put('/:id', controller.updateSupplier);


export const SupplierRouter = router;