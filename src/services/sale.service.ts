import { ObjectId } from 'mongodb';
import { SaleInterface } from '../types';
import { collections } from '../mongo/collections';
import { getClient } from './client.service';

/**
 * Return all sales
 */
export const getSales = async () => {
  return await collections.saleCollection?.find({}).toArray();
};

/**
 * Return a single sale by id
 */
export const getSale = async (id: string) => {
  const query = { _id: new ObjectId(id) };
  const sale = await collections.saleCollection?.findOne(query);
  if (!sale) {
    throw new Error('Sale not found');
  }
  return sale;
};

/**
 * Return all sales with client and items data
 * while keeping the color inside the item object
 */
export const getSalesWithClientAndItemData = async () => {
  return collections.saleCollection
    ?.aggregate([
      // on client_collection lookup for the client
      {
        $lookup: {
          from: 'client_collection',
          localField: 'client_id',
          foreignField: '_id',
          as: 'client'
        }
      },
      // unwind the client array: [{...}] -> {...}
      {
        $unwind: '$client'
      },
      // on item_collection lookup for the items
      {
        $lookup: {
          from: 'item_collection',
          localField: 'items.item_id',
          foreignField: '_id',
          as: 'original_items'
        }
      },
      // on this collection (sales) lookup for all sales with the same client
      {
        $lookup: {
          from: 'sale_collection',
          localField: 'client_id',
          foreignField: 'client_id',
          as: 'total_sales'
        }
      }
    ])
    .toArray();
};

/**
 * Post a new sale
 */
export const addSale = async (body: SaleInterface) => {
  const date = new Date();

  try {
    // Validate that client exists
    await getClient(body.client_id as string);

    // Validate that items exist
    const itemsIds = body.items.map((item) => item.item_id);
    const items = await collections.itemCollection
      ?.find({
        _id: { $in: itemsIds.map((id) => new ObjectId(id)) }
      })
      .toArray();

    // Validate that all items exist
    if (
      !itemsIds.every((id) => items?.some((item) => item._id.toString() === id))
    ) {
      throw new Error('One or more items do not exist');
    }

    // Convert client id and items id to ObjectId
    body.client_id = new ObjectId(body.client_id);
    body.items = body.items.map((item) => ({
      ...item,
      item_id: new ObjectId(item.item_id)
    }));

    // Save sale object
    return await collections.saleCollection?.insertOne({
      ...(body as Omit<SaleInterface, '_id'>),
      created_at: date
    });
  } catch (error) {
    throw new Error('Could not add sale ' + error);
  }
};

/**
 * Update a sale
 * TODO: Needs more work
 */
// export const updateSale = async (id: string, body: Sale) => {
//   const query = { _id: new ObjectId(id) };
//   const date = new Date();
//
//   try {
//     await getSale(id);
//     return await collections.saleCollection?.updateOne(query, {
//       $set: {
//         ...body,
//         updated_at: date
//       }
//     });
//   } catch (error) {
//     throw new Error('Could not update sale ' + error);
//   }
// };

/**
 * Delete a sale
 */
export const deleteSale = async (id: string) => {
  const query = { _id: new ObjectId(id) };

  try {
    await getSale(id);
    return await collections.saleCollection?.deleteOne(query);
  } catch (error) {
    throw new Error('Could not delete sale ' + error);
  }
};
