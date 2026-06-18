import express from 'express';
import { CategoryRouter } from './features/catalog/catalog.router.js';
import { AuthRouter } from './features/auth/auth.router.js';
import { UserRouter } from './features/user/user.router.js';
import { errorHandler } from './infra/middlewares/error.middleware.js';
import { SupplierRouter } from './features/supplier/supplier.router.js'; 
import { ProductRouter } from './features/products/product.router.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/v1/categories', CategoryRouter);
app.use('/api/v1/suppliers', SupplierRouter);
app.use('/api/v1/auth', AuthRouter);
app.use('/api/v1/users', UserRouter);
app.use('/api/v1/products', ProductRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});