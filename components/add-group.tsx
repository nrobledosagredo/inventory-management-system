"use client";

import { useState } from "react";

import { useCreateGroup } from "@/hooks/use-groups";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AddGroup() {
  const createGroup = useCreateGroup();
  const [groupTitle, setGroupTitle] = useState("");
  const [groupDescription, setGroupDescription] = useState("");

  {
    /* Create a new group */
  }
  const handleCreateGroup = () => {
    if (groupTitle.trim()) {
      createGroup(groupTitle, groupDescription);
      setGroupTitle("");
      setGroupDescription("");
    }
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      {/* Header */}
      <DialogHeader>
        <DialogTitle>Create a new group</DialogTitle>
        <DialogDescription>
          Enter information for your new group below.
        </DialogDescription>
      </DialogHeader>

      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="groupTitle">Title</Label>
        <Input
          id="groupTitle"
          value={groupTitle}
          onChange={(e) => setGroupTitle(e.target.value)}
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="groupDescription">Description</Label>
        <Input
          id="groupDescription"
          value={groupDescription}
          onChange={(e) => setGroupDescription(e.target.value)}
        />
      </div>

      {/* Footer */}
      <DialogFooter>
        <DialogClose asChild>
          <Button onClick={handleCreateGroup}>Create</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
