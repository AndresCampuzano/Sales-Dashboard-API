import express from 'express';
import customerRouter from './routes/customer';
import itemsRouter from './routes/item';
import saleRouter from './routes/sale';
import expenseRouter from './routes/expense';
import { connectToDatabase } from './mongo/database';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb' }));

connectToDatabase()
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.use('/api/clients', customerRouter); // TODO: delete endpoint once 'customers' endpoint is fully integrated on new dashboard (Vue)
    app.use('/api/customers', customerRouter);
    app.use('/api/items', itemsRouter);
    app.use('/api/sales', saleRouter);
    app.use('/api/expenses', expenseRouter);
    app.listen(PORT, () => {
      console.log(`🤖 Server is running on port: http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection failed', error);
    process.exit();
  });

export default app;
