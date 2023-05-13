import { ObjectId } from 'mongodb';
import { collections } from '../mongo/collections';
import { Client } from '../types';

/**
 * Return all clients
 */
export const getClients = async () => {
  return await collections.clientCollection?.find({}).toArray();
};

/**
 * Return a single client
 */
export const getClient = async (id: string) => {
  const query = { _id: new ObjectId(id) };
  const client = await collections.clientCollection?.findOne(query);
  if (!client) {
    throw new Error('Client not found');
  }
  return client;
};

/**
 * Post a new client
 */
export const addClient = async (body: Client) => {
  const date = new Date().toISOString();

  try {
    return await collections.clientCollection?.insertOne({
      ...(body as Omit<Client, '_id'>),
      created_at: date
    });
  } catch (error) {
    throw new Error('Could not add client ' + error);
  }
};

/**
 * Update a client
 */
export const updateClient = async (id: string, body: Client) => {
  const query = { _id: new ObjectId(id) };
  const date = new Date().toISOString();

  try {
    await getClient(id);
    return await collections.clientCollection?.updateOne(query, {
      $set: {
        ...body,
        updated_at: date
      }
    });
  } catch (error) {
    throw new Error('Could not update client ' + error);
  }
};

/**
 * Delete a client
 */
export const deleteClient = async (id: string) => {
  const query = { _id: new ObjectId(id) };

  try {
    await getClient(id);
    return await collections.clientCollection?.deleteOne(query);
  } catch (error) {
    throw new Error('Could not delete client ' + error);
  }
};
