"use client"

import { useState } from "react";
import { Trash } from "lucide-react";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { deleteCollection } from "@/lib/actions/collection.actions";
import { useParams, useRouter } from "next/navigation";

interface DeleteProps {
    item: string;
    id: string;
}

const Delete: React.FC<DeleteProps> = ({ item, id }) => {
    const router = useRouter()


    const onDelete = async () => {
        try {

            const itemType = item === "product" ? "products" : "collections";

            if (item === "product") {
                console.log("working");
                router.push(`/${itemType}`)
                router.refresh();
                toast.success(`${item} deleted`)
            } else {
                await deleteCollection(id);
                router.push(`/${itemType}`)
                router.refresh();
                toast.success(`${item} deleted`)
            }


        } catch (err) {
            console.log(err)
            toast.error("Something went wrong! Please try again.")
        }
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <Button size='icon' className="bg-red-1 text-white" asChild>
                    <Trash className="h-4 w-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white text-grey-1">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-red-1">Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your {item}.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-red-1 text-white" onClick={onDelete}>Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default Delete;
