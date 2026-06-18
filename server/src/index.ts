import express from 'express';
import { CatalogRouter } from './features/catalog/catalog.router.js';
import { SupplierRouter } from './features/supplier/supplier.router.js'; 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/catalog', CatalogRouter);
app.use('/api/suppliers', SupplierRouter);

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});