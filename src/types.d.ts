import { ObjectId } from 'mongodb';

export interface Client {
  _id?: string;
  name: string;
  instagram_account: string;
  address: string;
  department: string;
  city: string;
  phone: number;
  created_at?: string;
  updated_at?: string;
}

export interface Item {
  _id?: string;
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
  client: Client;
  items: {
    item_id: ObjectId | string;
    color: string;
    price: number;
  }[];
  original_items: Item[];
  created_at?: Date;
  updated_at?: Date;
}

export interface SaleWithClientAndItemData {
  _id: string;
  client_id: string;
  client: Client;
  items: {
    item_id: string;
    color: string;
    price: number;
  }[];
  original_items: Item[];
  created_at: string;
  updated_at?: string;
}
