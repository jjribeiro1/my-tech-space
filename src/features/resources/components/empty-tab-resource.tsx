import { ResourceType } from "../types";

interface Props {
  resourceType?: ResourceType;
}

export function ResourceTabEmpty({ resourceType }: Props) {
  return (
    <div className="bg-muted/10 flex flex-col items-center justify-center rounded-lg border p-8 text-center">
      <h3 className="mb-2 text-lg font-medium">
        {resourceType ? `No ${resourceType.name} found` : "No resource found"}
      </h3>
      <p className="text-muted-foreground mb-6 max-w-sm text-sm">
        {`You haven't added any ${resourceType ? `${resourceType.name}` : "resource"} to your collection yet.`}
      </p>
    </div>
  );
}
