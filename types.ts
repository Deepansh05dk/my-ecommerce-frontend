export interface Product {
  id: number;
  name: string;
  price: string;
  stock: number;
  imageUrl?: string | undefined;
}

export interface Order {
  id: number;
  total: number;
  status: orderStatus;
}
type orderStatus = "PENDING" | "PAID" | "SHIPPED" | "DELIVERED" | "CANCELLED";

export type formField = "name" | "stock" | "price" | "imageUrl";
