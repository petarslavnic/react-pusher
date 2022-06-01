import { useEffect } from "react";
import { useChannel } from "./useChannel";

export const useChannelEventListener = (
  eventName: string,
  eventCallback: (data: unknown) => void,
  channelName?: string
): void => {
  const channel = useChannel(channelName);

  useEffect(() => {
    channel?.bind(eventName, eventCallback);

    return () => {
      channel?.unbind(eventName, eventCallback);
    };
  }, [channel, eventName, eventCallback]);
};
