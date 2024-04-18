import { ObjectId } from 'mongodb';
import { collections } from '../mongo/collections';
import { CustomerInterface } from '../types';

/**
 * Return all customer
 */
export const getCustomers = async () => {
  return await collections.customerCollection?.find({}).toArray();
};

/**
 * Return a single customer
 */
export const getCustomer = async (id: string) => {
  const query = { _id: new ObjectId(id) };
  const res = await collections.customerCollection?.findOne(query);
  if (!res) {
    throw new Error('Customer not found');
  }
  return res;
};

/**
 * Post a new customer
 */
export const addCustomer = async (body: CustomerInterface) => {
  const date = new Date();

  try {
    return await collections.customerCollection?.insertOne({
      ...(body as Omit<CustomerInterface, '_id'>),
      created_at: date
    });
  } catch (error) {
    throw new Error('Could not add customer ' + error);
  }
};

/**
 * Update a customer
 */
export const updateCustomer = async (id: string, body: CustomerInterface) => {
  const query = { _id: new ObjectId(id) };
  const date = new Date();

  try {
    await getCustomer(id);
    return await collections.customerCollection?.updateOne(query, {
      $set: {
        ...body,
        updated_at: date
      }
    });
  } catch (error) {
    throw new Error('Could not update customer ' + error);
  }
};

/**
 * Delete a customer
 */
export const deleteCustomer = async (id: string) => {
  const query = { _id: new ObjectId(id) };

  try {
    await getCustomer(id);
    return await collections.customerCollection?.deleteOne(query);
  } catch (error) {
    throw new Error('Could not delete customer ' + error);
  }
};
