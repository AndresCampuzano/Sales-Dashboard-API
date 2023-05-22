import * as mongoDB from 'mongodb';
import { collections } from './collections';

/**
 * Connects to the mongo and sets the collections object
 */
export async function connectToDatabase() {
  // Check current environment
  if (process.env.NODE_ENV !== 'production') {
    console.log('🚀 Connecting to local database');
  } else {
    console.log('🚀 Connecting to Atlas database');
  }
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    process.env.ATLAS_URI as string
  );

  await client.connect();

  const db: mongoDB.Db = client.db(process.env.DB_NAME);

  collections.clientCollection = db.collection('client_collection');
  collections.itemCollection = db.collection('item_collection');
  collections.saleCollection = db.collection('sale_collection');
}
