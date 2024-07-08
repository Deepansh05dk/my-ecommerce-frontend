import { formField } from "./types";
import * as z from "zod";

export const formFields: formField[] = ["name", "stock", "price", "imageUrl"];

export const formSchema = z.object({
  name: z.string().min(1, { message: "Must be 1 or more characters long" }),
  stock: z.coerce.number().default(0),
  price: z.string().default("0"),
  imageUrl: z.string().optional(),
});
