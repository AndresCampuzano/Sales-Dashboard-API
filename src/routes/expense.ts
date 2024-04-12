import express from 'express';
import * as ExpenseService from '../services/expense.service';
import { isSchemaValid } from '../utils/isSchemaValid';
import { ExpenseSchema } from '../schemas/expense.schema';

const router = express.Router();

/**
 * GET /api/expenses - Returns all expenses
 */
router.get('/', async (_req, res) => {
  try {
    const expenses = await ExpenseService.getExpenses();
    res.send(expenses).status(200);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

/**
 * GET /api/expenses/:id - Returns a single expense
 */
router.get('/:id', async (req, res) => {
  try {
    const expense = await ExpenseService.getExpense(req.params.id);
    res.send(expense).status(200);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

/**
 * POST /api/expenses/ - Add a new expense
 */
router.post('/', async (req, res) => {
  try {
    const { error, value } = isSchemaValid(ExpenseSchema, req.body);
    if (error) {
      res.status(400).send(error.message);
      return;
    }
    const result = await ExpenseService.addExpense(value);
    res.send(result).status(201);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

/**
 * PUT /api/expenses/:id - Update a expense
 */
router.put('/:id', async (req, res) => {
  if (!req.params.id) {
    res.status(400).send('Id is required');
    return;
  }
  const { error, value } = isSchemaValid(ExpenseSchema, req.body);
  if (error) {
    res.status(400).send(error.message);
    return;
  }
  try {
    const result = await ExpenseService.updateExpense(req.params.id, value);
    res.send(result).status(201);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

/**
 * DELETE /api/expenses/:id - Delete a expense
 */
router.delete('/:id', async (req, res) => {
  if (!req.params.id) {
    res.status(400).send('Id is required');
    return;
  }
  try {
    await ExpenseService.deleteExpense(req.params.id);
    res.send('Expense deleted').status(200);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

export default router;
