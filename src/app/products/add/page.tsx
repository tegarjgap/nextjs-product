"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { insertProduct } from "@/app/products/services/mutations/addProduct";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useTransition } from "react";

const formSchema = z.object({
  category: z.string().min(2, {
    message: "Category minimal 2 Character",
  }),
  product_name: z.string().min(10, {
    message: "Product name minimal 10 Character",
  }),
  product_spec: z.string().min(10, {
    message: "Product spesifikasi minimal 10 Character",
  }),
  price: z.string().min(2, {
    message: "Harga minimal 2 Character",
  }),
});

export default function FormAdd() {
  const [_isPending, startTransition] = useTransition();
  const route = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(formValues: z.infer<typeof formSchema>) {
    startTransition(async () => {
      await insertProduct(formValues);
      toast({
        title: "Info",
        description: "Product Succesfully added!",
      });
    });
  }

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <h2 className="my-4 text-2xl">
        <b>Add Product</b>
      </h2>
      <div className="max-w-lg w-full shadow-xl p-10 rounded-xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              defaultValue=""
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder="Book" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="product_name"
              defaultValue=""
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Harry Potter" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="product_spec"
              defaultValue=""
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Spec</FormLabel>
                  <FormControl>
                    <Input placeholder="500hl" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              defaultValue=""
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input placeholder="235.000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-4">
              <Button type="submit">Submit</Button>
              <Button asChild variant="outline">
                <Link href={"/products"} prefetch={false}>
                  Cancel
                </Link>
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
