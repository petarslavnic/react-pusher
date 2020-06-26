import React from 'react'
import * as PusherTypes from 'pusher-js'

export interface PusherChannel {
  channel?: PusherTypes.Channel;
}

export const PusherChannelContext = React.createContext<PusherChannel>({})
