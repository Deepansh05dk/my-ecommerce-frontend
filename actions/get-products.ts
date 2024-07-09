import { Product } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

const getProducts = async (): Promise<Product[]> => {
    const res = await fetch(URL, {
        cache: 'no-store',
    })
    const products = await res.json();
    return products
}

export default getProducts;
