
import { Plus } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { DataTable } from "@/components/custom-ui/DataTable";
import { columns } from "./_components/column";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { fetchCollections } from "@/lib/actions/collection.actions";

const Collections = async () => {
    const user = await currentUser();

    if (!user) redirect("/sign-in")

    const collections = (await fetchCollections()) || []
    console.log(collections,"col")

    return (
        <div className="px-10 py-5">
            <div className="flex items-center justify-between">
                <p className="text-3xl font-bold">Collections</p>
                <Link href="/collections/new" className={cn(buttonVariants())}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Collection
                </Link>
            </div>
            <Separator className="bg-grey-1 my-4" />
            <DataTable columns={columns} data={collections} searchKey="title" />
        </div>
    );
};

export default Collections;
