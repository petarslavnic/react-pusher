import { createContext, useContext } from "react";
import * as PusherTypes from "pusher-js";

export interface PusherChannel {
  channel?: PusherTypes.Channel;
  channels?: Record<string, PusherTypes.Channel | undefined>;
}

export const PusherChannelContext = createContext<PusherChannel>({});

export const usePusherChannelContext = (): PusherChannel =>
  useContext(PusherChannelContext);
