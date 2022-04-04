import { useEffect } from "react";
import { usePusherChannelContext } from "../context";

export const useChannelEventListener = (
  eventName: string,
  eventCallback: (data: unknown) => void
): void => {
  const { channel } = usePusherChannelContext();

  useEffect(() => {
    channel?.bind(eventName, eventCallback);

    return () => {
      channel?.unbind(eventName, eventCallback);
    };
  }, [channel, eventName, eventCallback]);
};
