import { useCallback } from "react";
import { useChannel } from "./useChannel";

export const useChannelEventTrigger = (
  channelName?: string
): ((event: string, data: unknown) => boolean) => {
  const channel = useChannel(channelName);

  const trigger = useCallback(
    (event: string, data: unknown): boolean => {
      return channel ? channel.trigger(event, data) : false;
    },
    [channel]
  );

  return trigger;
};
