import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { formSchema, formFields } from "@/constants";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Product } from "@/types";
import updateProduct from "@/actions/update-product";

export default function ProductEditModal({
  editHandler,
  children,
  data,
}: {
  editHandler: (updatedProduct: Product) => void;
  children: React.ReactNode;
  data: Product;
}) {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data.name,
      imageUrl: data.imageUrl,
      price: data.price,
      stock: data.stock,
    },
  });
  const handleEditProducts = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const editProduct = await updateProduct(data.id, values);
      editHandler(editProduct);
      toast.success("Updated successfully");
    } catch (err) {
      toast.error(`Something went Wrong ${err}`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal title="edit product" triggerElement={children}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleEditProducts)}>
          {formFields.map((eachField) => (
            <FormField
              key={eachField}
              control={form.control}
              name={eachField}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{field.name}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={field.name}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <div className="flex items-center justify-end w-full pt-6 space-x-2">
            <Button disabled={loading}>Update Product</Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
}
