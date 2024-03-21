import { fetchCollections } from "@/lib/actions/collection.actions"
import ProductForm from "../_components/ProductForm"
import { fetchProductById } from "@/lib/actions/product.actions";

const UpdateProduct = async ({ params }: { params: { productId: string } }) => {

  const id = params.productId as string;

  const collections = await fetchCollections();

  const data = await fetchProductById(id)
  console.log(data)


  return (
    <ProductForm collections={collections} initialData={data} />
  )
}

export default UpdateProduct