import { useContext, useCallback } from 'react'
import { PusherChannelContext } from '../context'

export const useChannelEventTrigger = (): (event: string, data: any) => boolean => {
  const { channel } = useContext(PusherChannelContext)

  const trigger = useCallback(
    (event: string, data: any): boolean => {
      if (channel) {
        return channel.trigger(event, data)
      }
      return false
    },
    [channel],
  )

  return trigger
}
