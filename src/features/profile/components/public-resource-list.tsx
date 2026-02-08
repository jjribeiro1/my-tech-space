import { ResourceWithType } from "@/features/resources/data";
import { PublicResourceItem } from "./public-resource-item";

interface Props {
  resources: Array<ResourceWithType>;
}

export function PublicResourceList({ resources }: Props) {
  if (resources.length === 0) {
    return (
      <div className="text-muted-foreground py-10 text-center">
        This user has no public resources.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {resources.map((resource) => (
        <PublicResourceItem key={resource.id} resource={resource} />
      ))}
    </div>
  );
}
