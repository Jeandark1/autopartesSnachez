export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  part_number: string;
  brand: string;
  category_id: string;
  price: number;
  image_url: string;
  stock: number;
  compatible_models: string[];
  year_range: string;
  featured: boolean;
  created_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderPayload {
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  delivery_address: string;
  payment_method: 'qr' | 'bank_transfer' | 'cash_on_delivery';
  total: number;
  notes: string;
}

export interface OrderItemPayload {
  order_id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
}
