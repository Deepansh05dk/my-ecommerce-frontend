import { Order } from "@/types";


const URL = `${process.env.NEXT_PUBLIC_API_URL}/admin/orders`;

const getOrders = async (): Promise<Order[]> => {
  const res = await fetch(URL, {
    cache: 'no-store'
  })
  const orders = await res.json();
  return orders
};

export default getOrders;
