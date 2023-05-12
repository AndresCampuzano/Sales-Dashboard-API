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

  const db: mongoDB.Db = client.db(process.env.DB_NAME);

  collections.dashboardCollection = db.collection(
    process.env.DB_COLLECTION || ''
  );
}
