import express from 'express';
import * as CustomerService from '../services/customer.service';
import { isSchemaValid } from '../utils/isSchemaValid';
import { CustomerSchema } from '../schemas/customer.schema';

const router = express.Router();

/**
 * GET /api/customers - Returns all customers
 */
router.get('/', async (_req, res) => {
  try {
    const result = await CustomerService.getCustomers();
    res.send(result).status(200);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

/**
 * GET /api/customers/:id - Returns a single customers
 */
router.get('/:id', async (req, res) => {
  try {
    const customer = await CustomerService.getCustomer(req.params.id);
    res.send(customer).status(200);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

/**
 * POST /api/customers/ - Add a new customers
 */
router.post('/', async (req, res) => {
  try {
    const { error, value } = isSchemaValid(CustomerSchema, req.body);
    if (error) {
      res.status(400).send(error.message);
      return;
    }
    const result = await CustomerService.addCustomer(value);
    res.send(result).status(201);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

/**
 * PUT /api/customers/:id - Update a customers
 */
router.put('/:id', async (req, res) => {
  if (!req.params.id) {
    res.status(400).send('Id is required');
    return;
  }
  const { error, value } = isSchemaValid(CustomerSchema, req.body);
  if (error) {
    res.status(400).send(error.message);
    return;
  }
  try {
    const result = await CustomerService.updateCustomer(req.params.id, value);
    res.send(result).status(201);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

/**
 * DELETE /api/customers/:id - Delete a customers
 */
router.delete('/:id', async (req, res) => {
  if (!req.params.id) {
    res.status(400).send('Id is required');
    return;
  }
  try {
    await CustomerService.deleteCustomer(req.params.id);
    res.send('Customer deleted').status(200);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

export default router;
