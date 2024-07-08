import axios from "axios";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/admin/product/`;

const deleteProduct = async (
  id: number
): Promise<{
  message: string;
}> => {
  const res = await axios.delete(URL + id);
  return res.data;
};

export default deleteProduct;
