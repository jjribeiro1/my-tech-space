import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { ResourceLinkData } from "../data";

interface ResourceLinkContentProps {
  link: ResourceLinkData["link"];
}

export function ResourceLinkContent({ link }: ResourceLinkContentProps) {
  return (
    <Link
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary inline-flex items-center gap-1 text-sm hover:underline"
    >
      <ExternalLink className="h-3 w-3" />
      {link.url}
    </Link>
  );
}
