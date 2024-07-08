"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import deleteProduct from "@/actions/delete-product";
import toast from "react-hot-toast";
import ProductEditModal from "@/components/modals/product-edit";
import ProductAddModal from "@/components/modals/product-add";
import { Input } from "@/components/ui/input";


export function ProductsTable({ products }: { products: Product[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [adminProducts, setAdminProducts] = useState(products);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = adminProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProduct = (newProduct: Product) => {
    setAdminProducts([...adminProducts, newProduct]);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setAdminProducts(
      products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  const handleDelete = async (id: number) => {
    try {
      const { message } = await deleteProduct(id);
      setAdminProducts(adminProducts.filter((product) => product.id !== id));
      toast.success(message);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return <>
    <div className="mb-4 flex gap-4 items-center">
      <Input
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleSearch}
        className="max-w-sm"
      />
      <ProductAddModal
        addHandler={(newProduct: Product) => handleAddProduct(newProduct)}
      />
    </div>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="hidden w-[100px] sm:table-cell">
            <span className="sr-only">Image</span>
          </TableHead>
          <TableHead>Product ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead>Edit</TableHead>
          <TableHead>Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredProducts.map((product) => (
          <TableRow key={product.id}>
            <TableCell className="hidden sm:table-cell">
              <Image
                src={product.imageUrl ? product.imageUrl : ""}
                alt="product-image"
                className="aspect-square rounded-md object-cover"
                width={60}
                height={60}
              />
            </TableCell>
            <TableCell>{product.id}</TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell>{product.stock}</TableCell>
            <TableCell>
              <ProductEditModal
                editHandler={handleUpdateProduct}
                data={product}
              >
                <Button variant={"outline"}>Edit </Button>
              </ProductEditModal>
            </TableCell>
            <TableCell>
              <Button
                onClick={() => handleDelete(product.id)}
                variant={"outline"}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </>

}
