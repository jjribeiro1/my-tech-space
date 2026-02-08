import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import dayjs from "@/lib/dayjs";

interface Props {
  user: {
    id: string;
    name: string;
    image: string | null;
    created_at: Date;
  };
  publicCollectionsCount: number;
}

export function ProfileHeader({ user, publicCollectionsCount }: Props) {
  return (
    <div className="flex flex-col items-center gap-4 py-8 md:flex-row md:items-start md:gap-8">
      <Avatar className="h-24 w-24">
        <AvatarImage src={user.image ?? ""} alt={user.name} />
        <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>

      <div className="flex flex-col items-center gap-2 md:items-start">
        <h1 className="text-3xl font-bold">{user.name}</h1>
        <div className="text-muted-foreground flex items-center gap-4 text-sm">
          <span>Joined {dayjs(user.created_at).format("MMMM YYYY")}</span>
          <span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs font-medium">
            {publicCollectionsCount} Public Collections
          </span>
        </div>
      </div>
    </div>
  );
}
