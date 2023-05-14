import * as mongoDB from 'mongodb';

/**
 * The collections object
 */
export const collections: {
  clientCollection?: mongoDB.Collection;
  itemCollection?: mongoDB.Collection;
  saleCollection?: mongoDB.Collection;
} = {};
