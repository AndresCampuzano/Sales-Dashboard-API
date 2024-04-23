import { ObjectId } from 'mongodb';
import { CustomerInterface, ItemInterface, SaleInterface } from '../types';
import { collections } from '../mongo/collections';
import { getCustomer } from './customer.service';
import sgMail from '@sendgrid/mail'
import { colorFromLocalConstants } from '../utils/colors';
import { currencyFormat } from '../utils/currencyFormat';

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
 * Return all sales with customer and items data
 * while keeping the color inside the item object
 */
export const getSalesWithCustomerAndItemData = async () => {
  return collections.saleCollection
    ?.aggregate([
      // on client_collection lookup for the customer
      {
        $lookup: {
          from: 'client_collection',
          localField: 'client_id',
          foreignField: '_id',
          as: 'client'
        }
      },
      // unwind the customer/client array: [{...}] -> {...}
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
      // on this collection (sales) lookup for all sales with the same customer
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
    // Validate that all items exist
    const itemsIds = body.items.map((item) => item.item_id);
    const items = await collections.itemCollection
      ?.find({
        _id: { $in: itemsIds.map((id) => new ObjectId(id)) }
      })
      .toArray();
    if (
      !itemsIds.every((id) => items?.some((item) => item._id.toString() === id))
    ) {
      throw new Error('One or more items do not exist');
    }

    // Find the customer object
    const customer = await getCustomer(body.client_id as string);
    // Check if the customer exists
    if (customer) {
      // Update the customer document to add the attribute has_snapshot_on_sales: true
      await collections.customerCollection?.updateOne(
        { _id: customer._id },
        { $set: { has_snapshots_on_sales: true } }
      );
      // Set has_snapshot_on_sales in the customer object (if the customer does not have it already in DB)
      customer.has_snapshots_on_sales = true;
    } else {
      throw new Error('Customer not found');
    }


    interface UserInterface {
      _id: string;
      email: string;
    }

    // Email confirmation
    const users = await collections.userCollection?.find({}).toArray() as unknown as UserInterface[]
    const allItemsOnDB = await collections.itemCollection?.find({}).toArray() as unknown as ItemInterface[]

    const itemsForTemplate = body.items.map(itemReq => {
      const itemOnDB = allItemsOnDB.find(itemDB => itemDB._id.toString() === itemReq.item_id)
      return {
        id: itemOnDB?._id,
        name: itemOnDB?.name,
        image: itemOnDB?.image,
        color: itemReq.color,
        price: itemReq.price,
      }
    })

    const earnings = body.items.reduce(
      (accumulator: any, currentValue: any) => accumulator + currentValue.price,
      0
    )
    await sgMail.send({
      to: users?.map(x => x.email),
      from: process.env.SENDGRID_CUSTOM_SENDER || '',
      subject: `🛍️ Nueva venta para ${customer?.name}`,
      text: 'Se ha generado una nueva venta',
      html: `<!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>🛍️ Nueva venta para ${customer?.name}</title>
            </head>
            <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #111827;">
            
            <table cellpadding="20" cellspacing="0" width="100%" style="border-collapse: collapse; max-width: 600px; margin: 0 auto; background-color: #111827; color: #fafafa;">
            
              <tr>
                <td colspan="2" style="padding-top: 20px;">
                  <h2 style="margin: 0;">🦋 Se ha generado una nueva venta para ${customer?.name}</h2>
                </td>
              </tr>
              <tr>
                <td colspan="2" style="padding-top: 10px;">
                  <hr style="border: 1px solid #444444;">
                </td>
              </tr>
            
            ${itemsForTemplate?.map(x => {
              return `<tr>
                <td colspan="2" style="padding-top: 20px; background-color: #1F2937; border-radius: 8px;">
                  <table cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td style="width: 10%;">
                        <img src="${x.image}" alt="${x.name}" width="42" height="42" style="border-radius: 50%; display: block; margin-right: 6px;">
                      </td>
                      <td style="width: 70%;">
                        <p style="margin: 0 0 10px;">${x.name}</p>
                        <span style="background-color: ${colorFromLocalConstants(x.color).bgColor}; color: ${colorFromLocalConstants(x.color).textColor}; padding: 5px 10px; border-radius: 5px; font-size: 14px;">${x.color}</span>
                      </td>
                      <td style="width: 20%;">
                        <p >${currencyFormat(x.price)}</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr style="height: 6px;">
                <td colspan="2"></td>
              </tr>`
              }).join('')}
                      
              <tr>
                <td style="width: 60%;">
                </td>
                <td style="width: 40%; text-align: right; color: #49DE80">
                  <p style="margin: 0;">Ganancias: ${currencyFormat(earnings)}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p style="margin: 0 0 4px;">${customer?.name}</p>
                  <p style="margin: 0 0 4px;">${customer?.address}</p>
                  <p style="margin: 0 0 4px">${customer?.city} / ${customer?.department}</p>
                  <a href="https://www.instagram.com/${customer?.instagram_account}" style="color: #4f46e5; text-decoration: none; margin: 0 0 4px; display: block">@${customer?.instagram_account}</a>
                  <p style="margin: 0 0 4px;"><a href="tel:${customer?.phone}" style="color: #4f46e5; text-decoration: none;">${customer?.phone}</a></p>
                   <p style="margin: 0 0 4px;">${customer?.comments || ''}</p>
                   <p style="margin: 0 0 4px;">${customer?.cc || ''}</p>
                </td>
              </tr>
            </table>
            </body>
            </html>`,
    })

    // Convert customer id and items id to ObjectId
    body.client_id = new ObjectId(body.client_id);
    // Saves the customer's info when the sale is created
    body.client_snapshot = customer as unknown as CustomerInterface
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
