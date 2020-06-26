import React, { FC, useState, useContext, useEffect } from 'react'
import { PusherContext, PusherChannelContext } from '../context'
import * as PusherTypes from 'pusher-js'

interface PusherChannelProps {
  name: string;
}

export const PusherChannel: FC<PusherChannelProps> = ({ name, children }) => {
  const { pusher } = useContext(PusherContext)
  const [ channel, setChannel ] = useState<PusherTypes.Channel>()

  useEffect(
    () => {
      const channel = pusher?.subscribe(name)

      setChannel(channel)

      return () => {
        pusher?.unsubscribe(name)
      }
    },
    [name, pusher]
  )

  return (
    <PusherChannelContext.Provider value={{ channel }}>
      {React.Children.only(children)}
    </PusherChannelContext.Provider>
  )
}

PusherChannel.displayName = 'PusherChannel'
