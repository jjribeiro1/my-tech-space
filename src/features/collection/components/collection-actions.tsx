import { Share2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeleteCollectionAlert } from "./delete-collection-alert";
import { CollectionDialog } from "./collection-dialog";
import { Collection } from "../types";

interface Props {
  collection: Collection;
}

export function CollectionActions({ collection }: Props) {
  return (
    <>
      <div className="flex items-center gap-2">
        <Button className="cursor-pointer" variant="outline" size={"sm"}>
          <Share2 />
          Share
        </Button>

        <CollectionDialog
          key={collection.id + collection.updated_at}
          collectionToEdit={collection}
          trigger={
            <Button className="cursor-pointer" variant="outline" size={"sm"}>
              <Edit />
              Edit
            </Button>
          }
        />

        <DeleteCollectionAlert collectionId={collection.id} />
      </div>
    </>
  );
}
