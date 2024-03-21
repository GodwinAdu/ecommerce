"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";


import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/custom-ui/ImageUpload";
import toast from "react-hot-toast";
import { createCollection, updateCollections } from "@/lib/actions/collection.actions";
import Delete from "@/components/custom-ui/Delete";


const formSchema = z.object({
  title: z.string().min(2).max(20),
  description: z.string().min(2).max(500).trim(),
  imageUrl: z.string(),
});

interface CollectionFormProps {
  initialData?: CollectionType | null; //Must have "?" to make it optional
}

const CollectionForm: React.FC<CollectionFormProps> = ({ initialData }) => {
  const router = useRouter();
  const pathname = usePathname()


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? initialData
      : {
        title: "",
        description: "",
        imageUrl: "",
      },
  });

  const { isSubmitting } = form.formState;
  
  const submitting = initialData ? "Updating" : "Submitting";
  const submit = initialData ? "Update" : "Submit";

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {

      initialData
        ? await updateCollections(initialData._id, values, pathname)
        : await createCollection(values, pathname);


      toast.success(`Collection ${initialData ? "updated" : "created"}`);
      router.push("/collections");

    } catch (err) {
      console.log("something went wrong", err);
      toast.error("Something went wrong! Please try again.");
    }
  };

  return (
    <div className="p-10">
      {initialData ? (
        <div className="flex items-center justify-between">
          <p className="text-3xl font-bold">Edit Collection</p>
          <Delete id={initialData._id} item="collection" />
        </div>
      ) : (
        <p className="text-3xl font-bold">Create Collection</p>
      )}
      <Separator className="bg-grey-1 mt-4 mb-7" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input disabled={isSubmitting} placeholder="Title" {...field} onKeyDown={handleKeyPress} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea disabled={isSubmitting} placeholder="Description" {...field} rows={5} onKeyDown={handleKeyPress} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-10">
            <Button disabled={isSubmitting} type="submit" className="bg-blue-1 text-white">
              {isSubmitting ? submitting : submit}
            </Button>
            <Button
              type="button"
              onClick={() => router.push("/collections")}
              className="bg-red-300 text-white"
            >
              Discard
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CollectionForm;
