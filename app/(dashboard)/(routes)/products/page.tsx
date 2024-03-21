
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { columns } from "./_components/column";
import { DataTable } from "@/components/custom-ui/DataTable";

import { fetchAllProducts } from "@/lib/actions/product.actions";

const Products = async () => {
    
    const products = (await fetchAllProducts()) || [];

    return (
        <div className="px-10 py-5">
            <div className="flex items-center justify-between">
                <p className="text-3xl font-bold">Products</p>
                <Link
                    className={cn(buttonVariants())}
                    href="/products/new"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    <span className="hidden md:block">Create Product</span>
                   
                </Link>
            </div>
            <Separator className="bg-grey-1 my-4" />
            <DataTable columns={columns} data={products} searchKey="title" />
        </div>
    );
};

export default Products;
