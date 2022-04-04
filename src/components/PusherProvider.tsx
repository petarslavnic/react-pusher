import React, { FC } from "react";
import Pusher from "pusher-js";
import { PusherContext } from "../context";

interface PusherProviderProps {
  instance: Pusher;
}

export const PusherProvider: FC<PusherProviderProps> = ({
  instance,
  children,
}) => {
  return (
    <PusherContext.Provider value={{ pusher: instance }}>
      {children}
    </PusherContext.Provider>
  );
};

PusherProvider.displayName = "PusherProvider";
