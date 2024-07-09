'use client'
import { Product } from "@/types";
import NoResults from "@/components/ui/no-results";
import ProductCard from "@/components/ui/product-card";
import { useEffect, useState } from "react";


interface ProductListProps {
  title: string;
  items: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ title, items }) => {
  const [productItems, setProductItems] = useState(items)
  useEffect(() => {
    const sse = new EventSource(`${process.env.NEXT_PUBLIC_API_URL}/sse`)
    sse.onmessage = (event) => {
      const parsedData = JSON.parse(event.data);
      if (parsedData.type) {
        if (parsedData.type === 'products_update') {
          setProductItems(productItems.map((item) =>
            item.id === parsedData.product.id ? parsedData.product : item
          ))
        }
        if (parsedData.type === 'products_added') {
          setProductItems([...productItems, parsedData.product])
        }
        if (parsedData.type === 'products_deleted') {
          setProductItems(
            productItems.filter((item) => item.id !== parsedData.product.id)
          )
        }

      }

    }
  }, [])
  return (
    <div className="space-y-4">
      <h3 className="text-3xl font-bold">{title}</h3>
      {items?.length === 0 && <NoResults />}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {productItems.map((item) =>
          item.stock > 0 ? <ProductCard key={item.id} data={item} /> : <></>
        )}
      </div>
    </div>
  );
};

export default ProductList;
