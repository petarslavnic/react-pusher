import React, { FC, useState, useEffect } from "react";
import {
  PusherChannelContext,
  usePusherChannelContext,
  usePusherContext,
} from "../context";
import * as PusherTypes from "pusher-js";

interface PusherChannelProps {
  name: string;
}

export const PusherChannel: FC<PusherChannelProps> = ({ name, children }) => {
  const { pusher } = usePusherContext();
  const { channels } = usePusherChannelContext();
  const [channel, setChannel] = useState<PusherTypes.Channel>();

  useEffect(() => {
    const channel = pusher?.subscribe(name);

    setChannel(channel);

    return () => {
      pusher?.unsubscribe(name);
    };
  }, [name, pusher]);

  return (
    <PusherChannelContext.Provider
      value={{ channel, channels: { ...channels, [name]: channel } }}
    >
      {children}
    </PusherChannelContext.Provider>
  );
};

PusherChannel.displayName = "PusherChannel";
