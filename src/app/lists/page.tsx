import React from "react";
import ListTab from "./ListTab";
import { fetchCurrentUserLikeIds, fetchLikedMembers } from "@/actions/likeActions";

export default async function page({
  searchParams,
}: {
  searchParams: { type: string };
}) {
  const likeIds = await fetchCurrentUserLikeIds();
  const members = await fetchLikedMembers(searchParams.type);

  return (
    <div>
      <ListTab members={members} likedIds={likeIds} />
    </div>
  );
}
