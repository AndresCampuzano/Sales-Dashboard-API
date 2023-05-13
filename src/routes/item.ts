import express from 'express';
import * as ItemService from '../services/item.service';

const router = express.Router();

/**
 * GET /api/items - Returns all items
 */
router.get('/', async (_req, res) => {
  try {
    const items = await ItemService.getItems();
    res.send(items).status(200);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

/**
 * GET /api/items/:id - Returns a single item
 */
router.get('/:id', async (req, res) => {
  try {
    const item = await ItemService.getItem(req.params.id);
    res.send(item).status(200);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

/**
 * POST /api/items/ - Add a new item
 */
router.post('/', async (req, res) => {
  try {
    const result = await ItemService.addItem(req.body);
    res.send(result).status(201);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});
