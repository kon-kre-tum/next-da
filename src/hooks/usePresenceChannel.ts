import { useCallback, useEffect, useRef } from "react";
import usePresenceStore from "./usePresenceStore";
import { Channel, Members } from "pusher-js";
import { pusherClient } from "@/app/lib/pusher";

const CHANNEL_NAME = "presence-chat";
const EVENT_SUBSCRIPTION_SUCCEEDED = "pusher:subscription_succeeded";
const EVENT_MEMBER_ADDED = "pusher:member_added";
const EVENT_MEMBER_REMOVED = "pusher:member_removed";

export const usePresenceChannel = () => {
  const { set, add, remove } = usePresenceStore((state) => ({
    set: state.set,
    add: state.add,
    remove: state.remove,
  }));

  const channelRef = useRef<Channel | null>(null);

  const handleSetMembers = useCallback(
    (memberIds: string[]) => {
      set(memberIds);
    },
    [set]
  );

  const handleAddMember = useCallback(
    (memberId: string) => {
      add(memberId);
    },
    [add]
  );

  const handleRemoveMember = useCallback(
    (memberId: string) => {
      remove(memberId);
    },
    [remove]
  );

  useEffect(() => {
    if (!channelRef.current) {
      channelRef.current = pusherClient.subscribe(CHANNEL_NAME);
      channelRef.current.bind(
        EVENT_SUBSCRIPTION_SUCCEEDED,
        (members: Members) => {
          handleSetMembers(Object.keys(members.members));
        }
      );

      channelRef.current.bind(
        EVENT_MEMBER_ADDED,
        (member: Record<string, any>) => {
          handleAddMember(member.id);
        }
      );
      channelRef.current.bind(
        EVENT_MEMBER_REMOVED,
        (member: Record<string, any>) => {
          handleRemoveMember(member.id);
        }
      );
    }

    return () => {
      if (channelRef.current) {
        channelRef.current.unsubscribe();
        channelRef.current.unbind(EVENT_SUBSCRIPTION_SUCCEEDED, handleSetMembers);
        channelRef.current.unbind(EVENT_MEMBER_ADDED, handleAddMember);
        channelRef.current.unbind(EVENT_MEMBER_REMOVED, handleRemoveMember);
      }
    };
  }, [handleSetMembers, handleAddMember, handleRemoveMember]);
};

