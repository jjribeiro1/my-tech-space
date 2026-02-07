interface Props {
  typeLabel?: string;
}

export function ResourceTabEmpty({ typeLabel }: Props) {
  return (
    <div className="bg-muted/10 flex flex-col items-center justify-center rounded-lg border p-8 text-center">
      <h3 className="mb-2 text-lg font-medium">
        {typeLabel ? `No ${typeLabel} found` : "No resource found"}
      </h3>
      <p className="text-muted-foreground mb-6 max-w-sm text-sm">
        {`You haven't added any ${typeLabel || "resource"} to your collection yet.`}
      </p>
    </div>
  );
}
