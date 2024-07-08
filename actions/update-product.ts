import { Product } from "@/types";
import axios from "axios";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/admin/product/`;

const updateProduct = async (
  id: number,
  product: Pick<Product, "imageUrl" | "name" | "price" | "stock">
): Promise<Product> => {
  const res = await axios.put(URL + id, product);
  return res.data;
};

export default updateProduct;
