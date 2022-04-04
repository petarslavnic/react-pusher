import { createContext, useContext } from "react";
import Pusher from "pusher-js";

export interface PusherInstance {
  pusher?: Pusher;
}

export const PusherContext = createContext<PusherInstance>({});

export const usePusherContext = (): PusherInstance => useContext(PusherContext);
