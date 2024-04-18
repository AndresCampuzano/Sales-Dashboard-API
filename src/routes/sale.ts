import express from 'express';
import * as SaleService from '../services/sale.service';
import { isSchemaValid } from '../utils/isSchemaValid';
import { SaleSchema } from '../schemas/sale.schema';
import { SaleWithCustomerAndItemDataInterface } from '../types';

const router = express.Router();

/**
 * GET /api/sales - Returns all sales with customer and item data
 */
router.get('/', async (_req, res) => {
  try {
    const sales = await SaleService.getSalesWithCustomerAndItemData();
    res.send(sales as SaleWithCustomerAndItemDataInterface[]).status(200);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

/**
 * GET /api/sales/:id - Returns a single sale
 */
router.get('/:id', async (req, res) => {
  try {
    const sale = await SaleService.getSale(req.params.id);
    res.send(sale).status(200);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

/**
 * POST /api/sales/ - Add a new sale
 */
router.post('/', async (req, res) => {
  try {
    const { error, value } = isSchemaValid(SaleSchema, req.body);
    if (error) {
      res.status(400).send(error.message);
      return;
    }
    const result = await SaleService.addSale(value);
    res.send(result).status(201);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

/**
 * PUT /api/sales/:id - Update a sale
 * TODO: Needs more work
 */
// router.put('/:id', async (req, res) => {
//   if (!req.params.id) {
//     res.status(400).send('Id is required');
//     return;
//   }
//   const { error, value } = isSchemaValid(SaleSchema, req.body);
//   if (error) {
//     res.status(400).send(error.message);
//     return;
//   }
//   try {
//     const result = await SaleService.updateSale(req.params.id, value);
//     res.send(result).status(200);
//   } catch (error: any) {
//     res.status(500).send(error.message);
//   }
// });

/**
 * DELETE /api/sales/:id - Delete a sale
 */
router.delete('/:id', async (req, res) => {
  try {
    const result = await SaleService.deleteSale(req.params.id);
    res.send(result).status(200);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

export default router;
