import { ObjectId } from 'mongodb';
import { collections } from '../mongo/collections';
import { ExpenseInterface } from '../types';

/**
 * Return all expenses
 */
export const getExpenses = async () => {
  return await collections.expenseCollection?.find({}).toArray();
};

/**
 * Return a single expense
 */
export const getExpense = async (id: string) => {
  const query = { _id: new ObjectId(id) };
  const expense = await collections.expenseCollection?.findOne(query);
  if (!expense) {
    throw new Error('Expense not found');
  }
  return expense;
};

/**
 * Post a new expense
 */
export const addExpense = async (body: ExpenseInterface) => {
  const date = new Date();

  try {
    return await collections.expenseCollection?.insertOne({
      ...(body as Omit<ExpenseInterface, '_id'>),
      created_at: date
    });
  } catch (error) {
    throw new Error('Could not add expense ' + error);
  }
};

/**
 * Update an expense
 */
export const updateExpense = async (id: string, body: ExpenseInterface) => {
  const query = { _id: new ObjectId(id) };
  const date = new Date();

  try {
    await getExpense(id);
    return await collections.expenseCollection?.updateOne(query, {
      $set: {
        ...body,
        updated_at: date
      }
    });
  } catch (error) {
    throw new Error('Could not update expense ' + error);
  }
};

/**
 * Delete a expense
 */
export const deleteExpense = async (id: string) => {
  const query = { _id: new ObjectId(id) };

  try {
    await getExpense(id);
    return await collections.expenseCollection?.deleteOne(query);
  } catch (error) {
    throw new Error('Could not delete expense ' + error);
  }
};
