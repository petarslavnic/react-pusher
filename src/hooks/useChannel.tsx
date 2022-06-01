import { usePusherChannelContext } from "../context";
import * as PusherTypes from "pusher-js";

export const useChannel = (name?: string): PusherTypes.Channel | undefined => {
  const { channel, channels } = usePusherChannelContext();
  return name && channels && channels[name] ? channels[name] : channel;
};
