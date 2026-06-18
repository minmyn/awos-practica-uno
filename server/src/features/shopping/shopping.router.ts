import { Router } from 'express';
import { ShoppingController } from './shopping.controller.js';

const router = Router();
const controller = new ShoppingController();

router.post('/', controller.create);      
router.get('/', controller.getAll);       
router.get('/:id', controller.getById);   
router.delete('/:id', controller.delete); 

export const ShoppingRouter = router;