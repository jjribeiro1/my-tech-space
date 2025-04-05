"use client";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FolderPlus, Lock, Unlock } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  CreateCollectionInput,
  createCollectionSchema,
} from "../schemas/create-collection-schema";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { createCollectionAction } from "../actions/create-collection-action";
import { toast } from "sonner";

export function CreateCollectionDialog() {
  const [openDialog, setOpenDialog] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<CreateCollectionInput>({
    defaultValues: {
      name: "",
      description: "",
      isPrivate: false,
    },
    resolver: zodResolver(createCollectionSchema),
  });

  function onSubmit(data: CreateCollectionInput) {
    startTransition(async () => {
      const action = await createCollectionAction(data);
      if (action.success) {
        toast.success(action.message);
        setOpenDialog(false);
      } else {
        toast.error(action.message);
      }
    });
  }

  return (
    <Dialog
      open={openDialog}
      onOpenChange={(open) => {
        setOpenDialog(open);
        form.reset();
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="cursor-pointer">
          <FolderPlus className="mr-2 h-4 w-4" />
          Create collection
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new collection</DialogTitle>
          <DialogDescription>
            Organize your resources into custom collections.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name of collection</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: NodeJS" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{"Description (optional)"}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the purpose of this collection"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isPrivate"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <FormLabel
                    htmlFor="private"
                    className="flex items-center gap-2"
                  >
                    {field.value ? (
                      <Lock className="text-muted-foreground h-4 w-4" />
                    ) : (
                      <Unlock className="text-muted-foreground h-4 w-4" />
                    )}
                    Private collection
                  </FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="cursor-pointer"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button
                  className="cursor-pointer"
                  type="button"
                  variant={"outline"}
                  disabled={isPending}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                className="cursor-pointer"
                type="submit"
                disabled={isPending}
              >
                <FolderPlus />
                Create collection
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
