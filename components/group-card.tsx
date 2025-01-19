import Link from "next/link";
import { Sparkles } from "lucide-react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function GroupCard({ group }: { group: Group }) {
  return (
    <Link href={`/${group.id}`}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles />
            {group.title}
          </CardTitle>
          <CardDescription>{group.description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
