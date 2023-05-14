import express from 'express';
import * as ItemService from '../services/item.service';
import { isSchemaValid } from '../utils/isSchemaValid';
import { ItemSchema } from '../schemas/item.schema';
import { multerUpload } from '../multer/multer';

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
 * multerUpload.single('image') - middleware to upload a single file
 * req.file - contains the uploaded file
 * req.body - contains the text fields
 */
router.post('/', multerUpload.single('image'), async (req, res) => {
  const { error } = isSchemaValid(ItemSchema, req.body);
  if (error) {
    res.status(400).send(error.message);
    return;
  }
  try {
    const result = await ItemService.addItem(req.body, req.file);
    res.send(result).status(201);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

/**
 * PUT /api/items/:id - Update a item
 */
router.put('/:id', async (req, res) => {
  if (!req.params.id) {
    res.status(400).send('Id is required');
    return;
  }
  const { error } = isSchemaValid(ItemSchema, req.body);
  if (error) {
    res.status(400).send(error.message);
    return;
  }
  try {
    const result = await ItemService.updateItem(req.params.id, req.body);
    res.send(result).status(200);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

/**
 * DELETE /api/items/:id - Delete a item
 */
router.delete('/:id', async (req, res) => {
  if (!req.params.id) {
    res.status(400).send('Id is required');
    return;
  }
  try {
    const result = await ItemService.deleteItem(req.params.id);
    res.send(result).status(200);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

export default router;
