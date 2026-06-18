import { Router } from 'express';
import { CatalogRepository } from './catalog.repository.js';
import { CatalogService } from './catalog.service.js';
import { CatalogController } from './catalog.controller.js';

const router = Router();

const repository = new CatalogRepository();
const service = new CatalogService(repository);
const controller = new CatalogController(service);

router.get('/', controller.getItems);
router.post('/', controller.createItem);

export const CatalogRouter = router;