import express from 'express';
import { CatalogRouter } from './features/catalog/catalog.router.js';
import { ProductRouter } from './features/products/product.router.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/v1/catalog', CatalogRouter);
app.use('/api/v1/products', ProductRouter);

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});