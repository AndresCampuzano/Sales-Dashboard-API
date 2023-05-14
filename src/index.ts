import express from 'express';
import clientsRouter from './routes/client';
import itemsRouter from './routes/item';
import saleRouter from './routes/sale';
import { connectToDatabase } from './mongo/database';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware for parsing the body of requests
app.use(express.json());

connectToDatabase()
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.use('/api/clients', clientsRouter);
    app.use('/api/items', itemsRouter);
    app.use('/api/sales', saleRouter);
    app.listen(PORT, () => {
      console.log(`🤖 Server is running on port: http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection failed', error);
    process.exit();
  });

export default app;
