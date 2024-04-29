import { ObjectId } from 'mongodb';
import { ItemInterface } from '../types';
import { collections } from '../mongo/collections';
import { deleteImage, uploadImage } from '../aws/imageHandler';

/**
 * Return all items
 */
export const getItems = async () => {
  return await collections.itemCollection?.find({}).toArray();
};

/**
 * Return a single item
 */
export const getItem = async (id: string) => {
  const query = { _id: new ObjectId(id) };
  const item = await collections.itemCollection?.findOne(query);
  if (!item) {
    throw new Error('Item not found');
  }
  return item;
};

/**
 * Post a new item
 */
export const addItem = async (body: ItemInterface) => {
  const date = new Date();

  try {
    const imageUrl = await uploadImage(body.image);
    return await collections.itemCollection?.insertOne({
      ...(body as Omit<ItemInterface, '_id'>),
      image: imageUrl,
      created_at: date
    });
  } catch (error) {
    throw new Error('Could not add item ' + error);
  }
};

/**
 * Update a item
 */
export const updateItem = async (id: string, body: ItemInterface) => {
  const query = { _id: new ObjectId(id) };
  const date = new Date();

  try {
    const item = await getItem(id);
    // Check if the image has changed, if it changed, it will always be a new base64 file
    if (item.image !== body.image) {
      // delete the old aws image
      const oldImageId = item.image.split('/').pop();
      await deleteImage(oldImageId);
      // Upload the new base 64 image
      const imageUrl = await uploadImage(body.image);

      return await collections.itemCollection?.updateOne(query, {
        $set: {
          ...body,
          image: imageUrl,
          updated_at: date
        }
      });
    }
    return await collections.itemCollection?.updateOne(query, {
      $set: {
        ...body,
        updated_at: date
      }
    });
  } catch (error) {
    throw new Error('Could not update item ' + error);
  }
};

/**
 * Delete a item
 */
export const deleteItem = async (id: string) => {
  const query = { _id: new ObjectId(id) };

  try {
    const item = await getItem(id);
    const imageId = item.image.split('/').pop();
    await deleteImage(imageId);
    return await collections.itemCollection?.deleteOne(query);
  } catch (error) {
    throw new Error('Could not delete item ' + error);
  }
};
