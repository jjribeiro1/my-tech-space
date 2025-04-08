import { Ellipsis } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function ResourceActionsDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={"icon"} variant={"ghost"} className="cursor-pointer">
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Editar</DropdownMenuItem>
        <DropdownMenuItem>Remmover</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
