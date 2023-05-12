import express from 'express';
import * as clientsServices from '../services/clients.service';

const router = express.Router();

/**
 * GET /api/clients - Returns all clients
 */
router.get('/', async (_req, res) => {
  try {
    const clients = await clientsServices.getClients();
    res.send(clients).status(200);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

/**
 * POST /api/clients/ - Add a new client
 */
router.post('/', async (req, res) => {
  try {
    const result = await clientsServices.addClient(req.body);
    res.send(result).status(201);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

/**
 * PUT /api/clients/:id - Update a client
 */
router.put('/:id', async (req, res) => {
  try {
    const result = await clientsServices.updateClient(req.params.id, req.body);
    res.send(result).status(201);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

/**
 * DELETE /api/clients/:id - Delete a client
 */
router.delete('/:id', async (req, res) => {
  try {
    await clientsServices.deleteClient(req.params.id);
    res.sendStatus(204);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

export default router;
