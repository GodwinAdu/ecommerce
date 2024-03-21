"use server"

import { revalidatePath } from "next/cache";
import Collection from "../models/collection.models";
import Product from "../models/product.models";
import { connectToDB } from "../mongoose";


interface CreateProductProps {
    title: string;
    category: string;
    collections: string[];
    colors: string[];
    description: string;
    expense: number;
    media: string[];
    price: number;
    sizes: string[];
    tags: string[];
}
export async function createProduct(values: CreateProductProps, pathname: string) {
    await connectToDB();
    try {
        const {
            title,
            description,
            media,
            category,
            collections,
            tags,
            sizes,
            colors,
            price,
            expense,
        } = values;

        if (!title || !description || !media || !category || !price || !expense) {
            throw new Error("Not enough data to create a product")
        }

        const newProduct = new Product({
            title,
            description,
            media,
            category,
            collections,
            tags,
            sizes,
            colors,
            price,
            expense,
        });

        await newProduct.save();

        if (collections) {
            for (const collectionId of collections) {
                const collection = await Collection.findById(collectionId);
                if (collection) {
                    collection.products.push(newProduct._id);
                    await collection.save();
                }
            }
        }

        revalidatePath(pathname)

    } catch (error) {
        console.log("Unable to create product", error);
        throw error;
    }
}


export async function fetchAllProducts() {
    await connectToDB();
    try {
        const products = await Product.find({})
            .sort({ createdAt: "desc" })
            .populate({ path: "collections", model: Collection })

        if (!products) {
            return []
        }

        return JSON.parse(JSON.stringify(products))

    } catch (error) {
        console.log("Unable to fetch products", error);
        throw error
    }
}

export async function fetchProductById(id: string) {
    await connectToDB();
    try {
        const product = await Product.findById({ _id: id })
            .populate({ path: "collections", model: Collection });

        if (!product) throw new Error("Product doesnt exist");

        return JSON.parse(JSON.stringify(product));

    } catch (error) {
        console.log("unable to fetch Product by Id", error);
        throw error;
    }
}


export async function updateProduct(productId: string, values: Partial<CreateProductProps>, pathname: string) {
    await connectToDB();

    try {
        const {
            title,
            description,
            media,
            category,
            collections,
            tags,
            sizes,
            colors,
            price,
            expense,
        } = values;

        const product = await Product.findById(productId);

        if (!product) {
            throw new Error('Product not found')
        }
        console.log(collections, "collections")
        const addedCollections: string[] = collections?.filter(
            (collectionId: string) => !product.collections.includes(collectionId)
        ) || [];
        // included in new data, but not included in the previous data

        const removedCollections: string[] = product.collections.filter(
            (collectionId: string) => !collections?.includes(collectionId)
        ) || [];
        // included in previous data, but not included in the new data

        // Update collections
        await Promise.all([
            // Update added collections with this product
            ...addedCollections.map((collectionId: string) =>
                Collection.findByIdAndUpdate(collectionId, {
                    $push: { products: product._id },
                })
            ),

            // Update removed collections without this product
            ...removedCollections?.map((collectionId: string) =>
                Collection.findByIdAndUpdate(collectionId, {
                    $pull: { products: product._id },
                })
            ),
        ]);


        // Update product
        const updatedProduct = await Product.findByIdAndUpdate(
            product._id,
            {
                title,
                description,
                media,
                category,
                collections,
                tags,
                sizes,
                colors,
                price,
                expense,
            },
            { new: true }
        ).populate({ path: "collections", model: Collection });

        const data = await updatedProduct.save();

        revalidatePath(pathname);

        return JSON.parse(JSON.stringify(data));

    } catch (error) {
        console.error("Error updating Product:", error);
        throw error;
    }
}