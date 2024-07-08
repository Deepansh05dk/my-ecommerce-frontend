import { Product } from "@/types";
import axios from "axios";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/admin/product`;

const addProduct = async (
  product: Pick<Product, "imageUrl" | "name" | "price" | "stock">
): Promise<Product> => {
  const res = await axios.post(URL, product);
  return res.data;
};

export default addProduct;
