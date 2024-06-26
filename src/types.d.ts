import { ObjectId } from 'mongodb';

export interface CustomerInterface {
  _id: string;
  name: string;
  instagram_account: string;
  address: string;
  department: string;
  city: string;
  phone: number;
  cc?: string;
  comments?: string;
  has_snapshots_on_sales?: boolean
  created_at?: string;
  updated_at?: string;
}

export interface ItemInterface {
  _id: string;
  name: string;
  price: number;
  image: string;
  available_colors: string[];
  created_at?: string;
  updated_at?: string;
}

export interface SaleInterface {
  _id: string;
  client_id: ObjectId | string;
  client: CustomerInterface;
  client_snapshot: CustomerInterface;
  items: {
    item_id: ObjectId | string;
    color: string;
    price: number;
  }[];
  original_items: ItemInterface[];
  created_at?: Date;
  updated_at?: Date;
}

export interface SaleWithCustomerAndItemDataInterface {
  _id: string;
  client_id: string;
  client: CustomerInterface;
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
  currency?: string;
  price: number;
  description?: string;
  created_at: string;
  updated_at?: string;
}
