import { Order, Product } from "@/types";
import axios from "axios";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/admin/orders`;

const getOrders = async (): Promise<Order[]> => {
  const res = await axios.get(URL);
  return res.data;
};

export default getOrders;
