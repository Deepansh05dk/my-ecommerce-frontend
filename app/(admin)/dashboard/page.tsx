
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import getOrders from "@/actions/get-orders";
import { Badge } from "@/components/ui/badge";
import { ProductsTable } from "./_components/products-table";
import getProducts from "@/actions/get-products";
import { OrdersTable } from "./_components/orders-table";


export default async function  DashboardPage() {
  const products=await getProducts()
  const orders=await getOrders()

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <h2 className="text-xl font-semibold mb-2">Orders</h2>
      <OrdersTable orders={orders} />
      <h2 className="text-xl font-semibold mt-8 mb-2">Products</h2>
      <ProductsTable products={products} />
    </div>
  );
}

