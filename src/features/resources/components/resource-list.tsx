import { getAllResourceTypes, getResourceCountFromCollection } from "../data";
import { CreateResourceDialog } from "./create-resource-dialog";

interface Props {
  collections: Array<{ id: string; name: string }>;
  selectedCollectionId: string;
}

export async function ResourceList({
  collections,
  selectedCollectionId,
}: Props) {
  const resourceTypes = await getAllResourceTypes();
  const resourceCount =
    await getResourceCountFromCollection(selectedCollectionId);
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-xl font-bold tracking-tight">{`Resources (${resourceCount})`}</p>

        <CreateResourceDialog
          collections={collections}
          resourceTypes={resourceTypes}
        />
      </div>
    </div>
  );
}
