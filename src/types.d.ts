import { ObjectId } from 'mongodb';

export interface ClientInterface {
  _id: string;
  name: string;
  instagram_account: string;
  address: string;
  department: string;
  city: string;
  phone: number;
  created_at?: string;
  updated_at?: string;
}

export interface ItemInterface {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  available_colors: string[];
  created_at?: string;
  updated_at?: string;
}

export interface Sale {
  _id: string;
  client_id: ObjectId | string;
  client: ClientInterface;
  items: {
    item_id: ObjectId | string;
    color: string;
    price: number;
  }[];
  original_items: ItemInterface[];
  created_at?: Date;
  updated_at?: Date;
}

export interface SaleWithClientAndItemDataInterface {
  _id: string;
  client_id: string;
  client: ClientInterface;
  items: {
    item_id: string;
    color: string;
    price: number;
  }[];
  original_items: ItemInterface[];
  created_at: string;
  updated_at?: string;
}

export interface ExpenseInterface {
  _id: string;
  name: string;
  type: string;
  description?: string;
  created_at: string;
  updated_at?: string;
}
