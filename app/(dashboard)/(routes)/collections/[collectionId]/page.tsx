import { fetchCollectionById } from "@/lib/actions/collection.actions";
import CollectionForm from "../_components/CollectionForm"

const CollectionDetails = async ({ params }: { params: { collectionId: string } }) => {

    const id = params.collectionId as string;

    const collectionDetails = await fetchCollectionById(id)

    return (
        <CollectionForm initialData={collectionDetails} />
    )
}

export default CollectionDetails