import { useCallback } from "react";
import { usePusherChannelContext } from "../context";

export const useChannelEventTrigger = (): ((
  event: string,
  data: unknown
) => boolean) => {
  const { channel } = usePusherChannelContext();

  const trigger = useCallback(
    (event: string, data: unknown): boolean => {
      return channel ? channel.trigger(event, data) : false;
    },
    [channel]
  );

  return trigger;
};
