import React, { FC } from 'react'
import { PusherContext } from '../context'
import Pusher from 'pusher-js'

interface PusherProviderProps {
  instance: Pusher;
}

export const PusherProvider: FC<PusherProviderProps> = ({ instance, children }) => {
  return (
    <PusherContext.Provider value={{ pusher: instance }}>
      {React.Children.only(children)}
    </PusherContext.Provider>
  )
}

PusherProvider.displayName = 'PusherProvider'
