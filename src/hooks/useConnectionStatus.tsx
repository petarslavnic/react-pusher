import { useEffect } from "react";
import { usePusherContext } from "../context";

export const useConnectionStatus = (
  eventName: string,
  eventCallback: (data: unknown) => void
): void => {
  const { pusher } = usePusherContext();

  useEffect(() => {
    pusher?.connection.bind(eventName, eventCallback);

    return () => {
      pusher?.connection.unbind(eventName, eventCallback);
    };
  }, [pusher, eventName, eventCallback]);
};
