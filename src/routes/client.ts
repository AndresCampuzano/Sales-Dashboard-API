import express from 'express';
import * as clientService from '../services/client.service';
import { clientSchema } from '../schemas/clientSchema';

const router = express.Router();

/**
 * GET /api/clients - Returns all clients
 */
router.get('/', async (_req, res) => {
  try {
    const clients = await clientService.getClients();
    res.send(clients).status(200);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

/**
 * POST /api/clients/ - Add a new client
 */
router.post('/', async (req, res) => {
  const isSchemaValid = clientSchema.validate(req.body);
  if (isSchemaValid.error) {
    res.status(400).send(isSchemaValid.error.message);
    return;
  }
  try {
    const result = await clientService.addClient(req.body);
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
  const isSchemaValid = clientSchema.validate(req.body);
  if (isSchemaValid.error) {
    res.status(400).send(isSchemaValid.error.message);
    return;
  }
  try {
    const result = await clientService.updateClient(req.params.id, req.body);
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
    await clientService.deleteClient(req.params.id);
    res.sendStatus(204);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

export default router;
