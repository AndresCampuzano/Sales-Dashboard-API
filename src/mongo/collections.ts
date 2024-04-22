import * as mongoDB from 'mongodb';

/**
 * The collections object
 */
export const collections: {
  customerCollection?: mongoDB.Collection;
  itemCollection?: mongoDB.Collection;
  saleCollection?: mongoDB.Collection;
  expenseCollection?: mongoDB.Collection;
  userCollection?: mongoDB.Collection;
} = {};
