import { fetchCollections } from "@/lib/actions/collection.actions"
import ProductForm from "../_components/ProductForm"

const CreateProduct = async() => {

  const collections= await fetchCollections()
  
  return (
    <ProductForm collections={collections} />
  )
}

export default CreateProduct