"use server"

import { revalidatePath } from "next/cache";
import Collection from "../models/collection.models";
import { connectToDB } from "../mongoose";
import Product from "../models/product.models";

interface CreateCollectionProps {
    title: string;
    description: string;
    imageUrl: string
}
export async function createCollection(values: CreateCollectionProps, pathname: string) {

    await connectToDB();

    try {
        const { title, description, imageUrl } = values;

        const existingCollection = await Collection.findOne({ title });

        if (existingCollection) {
            throw new Error('Collection is already exist')
        };

        if (!title || !imageUrl) {
            throw new Error('Title and Image are requiredd')
        };

        const newCollection = new Collection({
            title,
            description,
            imageUrl
        });

        await newCollection.save();

        revalidatePath(pathname);

    } catch (error) {
        console.log("unable to create collections", error);
        throw error
    }
}

export async function fetchCollections() {
    
    await connectToDB();
    try {
        const collections = await Collection.find({}).sort({ createdAt: "desc" });

        if (!collections) {
            return []
        };
        
        return JSON.parse(JSON.stringify(collections));
        

    } catch (error) {
        console.log("unable to fetch collections", error);
        throw error;
    }
}

export async function fetchCollectionById(id: string) {
    await connectToDB();
    try {
        const collection = await Collection.findById({ _id: id });

        if (!collection) throw new Error("collection doesnt exist");

        return JSON.parse(JSON.stringify(collection));

    } catch (error) {
        console.log("unable to fetch collection by Id", error);
        throw error;
    }
}

export async function updateCollections(collectionId: string, values: Partial<CreateCollectionProps>, pathname: string) {
    await connectToDB();

    try {
        const updateCollection = await Collection.findByIdAndUpdate(
            collectionId,
            { $set: values },
            { new: true, runValidators: true }
        );

        if (!updateCollection) {
            throw new Error('collection not found')
        }

        console.log("Update successful");

        revalidatePath(pathname)

        return JSON.parse(JSON.stringify(updateCollection));
    } catch (error) {
        console.error("Error updating Collection:", error);
        throw error;
    }
}

export async function deleteCollection(id: string) {
    await connectToDB();
    try {
        const collection = await Collection.findByIdAndDelete({
            _id: id
        });

        if (!collection) {
            console.log("collection don't exist");
            return null; // or throw an error if you want to handle it differently
        }
        await Product.updateMany(
            { collections: id },
            { $pull: { collections: id} }
          );
        console.log("delete sucessfully")

        return JSON.parse(JSON.stringify(collection));
    } catch (error) {
        console.error("Error deleting collection:", error);
        throw error; // throw the error to handle it at a higher level if needed
    }

}

