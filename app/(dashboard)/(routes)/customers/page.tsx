
import { Separator } from '@/components/ui/separator'
import { columns } from './_components/column'
import { DataTable } from '@/components/custom-ui/DataTable'


const Customers = async () => {

  const customers = []

  return (
    <div className='px-10 py-5'>
      <p className='text-3xl font-bold'>Customers</p>
      <Separator className='bg-grey-1 my-5' />
      <DataTable columns={columns} data={customers} searchKey='name'/>
    </div>
  )
}

export const dynamic = "force-dynamic";

export default Customers