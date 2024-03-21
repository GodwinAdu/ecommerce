import { DataTable } from "@/components/custom-ui/DataTable";
import { Separator } from "@/components/ui/separator";
import { columns } from "./_components/column";


const Orders = async () => {

    const orders = []
 

  return(
    <div className="px-10 py-5">
      <p className="text-3xl font-bold">Orders</p>
      <Separator className="bg-grey-1 my-5"/>
      <DataTable columns={columns} data={orders} searchKey="_id" />
    </div>
  )
}

export const dynamic = "force-dynamic";

export default Orders