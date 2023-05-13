export interface Client {
  _id?: string;
  name: string;
  instagram_account: string;
  address: string;
  city: string;
  phone: number;
  country: string;
  email: string;
  created_at?: string;
  updated_at?: string;
}

export interface Item {
  _id?: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  currency: string;
  available_colors: string[];
  created_at?: string;
  updated_at?: string;
}
