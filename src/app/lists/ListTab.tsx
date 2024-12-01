"use client";

import { Tab, Tabs } from "@nextui-org/react";
import { Member } from "@prisma/client";
import { Key } from "@react-types/shared";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import path from "path";
import React, { use, useTransition } from "react";
import MemberCard from "../members/MemberCard";
import LoadingComponent from "../components/LoadingComponent";

type Props = {
  members: Member[];
  likedIds: string[];
};

export default function ListTab({ members, likedIds }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  const [isPending, startTransition] = useTransition();

  const tabs = [
    { id: "source", label: "Members I have liked" },
    { id: "target", label: "Members that like me" },
    { id: "mutual", label: "Mutual likes" },
  ];

  function handleTabChange(key: Key): void {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);

      params.set("type", key.toString());

      router.replace(`${pathName}?${params.toString()}`);
    });
  }

  return (
    <div className="flex w-full flex-col mt-10 gap-5">
      <Tabs
        aria-label="Like Tabs"
        items={tabs}
        color="default"
        onSelectionChange={(key) => handleTabChange(key)}
      >
        {(item) => (
          <Tab key={item.id} title={item.label}>
            {isPending ? (
              <LoadingComponent/>
            ) : (
              <>
                {members.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-8">
                    {members.map((member) => (
                      <MemberCard
                        member={member}
                        key={member.id}
                        likedIds={likedIds}
                      />
                    ))}
                  </div>
                ) : (
                  <div> No members for this filter.</div>
                )}
              </>
            )}
          </Tab>
        )}
      </Tabs>
    </div>
  );
}
