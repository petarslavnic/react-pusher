import React from 'react'
import Pusher from 'pusher-js'

export interface PusherInstance {
  pusher?: Pusher;
}

export const PusherContext = React.createContext<PusherInstance>({})
