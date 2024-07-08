import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-hot-toast";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Product } from "@/types";
import { formSchema, formFields } from "@/constants";
import addProduct from "@/actions/add-product";

export default function ProductAddModal({
  addHandler,
}: {
  addHandler: (newProduct: Product) => void;
}) {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
      price: "0",
      stock: 0,
    },
  });

  const handleAddProducts = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const newProduct = await addProduct(values);
      addHandler(newProduct);
      toast.success("Added successfully");
    } catch (err) {
      toast.error(`Something went Wrong ${err}`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal
      title="Add product"
      triggerElement={
        <Button variant="outline" size="sm">
          Add
        </Button>
      }
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleAddProducts)}>
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
            <Button disabled={loading}>Add Product</Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
}
