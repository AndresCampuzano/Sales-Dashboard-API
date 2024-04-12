import express from 'express';
import * as ClientService from '../services/client.service';
import { isSchemaValid } from '../utils/isSchemaValid';
import { ClientSchema } from '../schemas/client.schema';

const router = express.Router();

/**
 * GET /api/clients - Returns all clients
 */
router.get('/', async (_req, res) => {
  try {
    const clients = await ClientService.getClients();
    res.send(clients).status(200);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

/**
 * GET /api/clients/:id - Returns a single client
 */
router.get('/:id', async (req, res) => {
  try {
    const client = await ClientService.getClient(req.params.id);
    res.send(client).status(200);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

/**
 * POST /api/clients/ - Add a new client
 */
router.post('/', async (req, res) => {
  try {
    const { error, value } = isSchemaValid(ClientSchema, req.body);
    if (error) {
      res.status(400).send(error.message);
      return;
    }
    const result = await ClientService.addClient(value);
    res.send(result).status(201);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

/**
 * PUT /api/clients/:id - Update a client
 */
router.put('/:id', async (req, res) => {
  if (!req.params.id) {
    res.status(400).send('Id is required');
    return;
  }
  const { error, value } = isSchemaValid(ClientSchema, req.body);
  if (error) {
    res.status(400).send(error.message);
    return;
  }
  try {
    const result = await ClientService.updateClient(req.params.id, value);
    res.send(result).status(201);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

/**
 * DELETE /api/clients/:id - Delete a client
 */
router.delete('/:id', async (req, res) => {
  if (!req.params.id) {
    res.status(400).send('Id is required');
    return;
  }
  try {
    await ClientService.deleteClient(req.params.id);
    res.send('Client deleted').status(200);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

export default router;
