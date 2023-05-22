import * as mongoDB from 'mongodb';
import { collections } from './collections';

/**
 * Connects to the mongo and sets the collections object
 */
export async function connectToDatabase() {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    process.env.ATLAS_URI as string
  );
  await client.connect();

  let db: mongoDB.Db;

  if (process.env.NODE_ENV !== 'production') {
    console.log('🚀 Connecting to local database');
    db = client.db(process.env.DB_NAME);
  } else {
    console.log('🚀 Connecting to PRODUCTION database');
    db = client.db(process.env.DB_NAME);
  }

  collections.clientCollection = db.collection('client_collection');
  collections.itemCollection = db.collection('item_collection');
  collections.saleCollection = db.collection('sale_collection');
}
