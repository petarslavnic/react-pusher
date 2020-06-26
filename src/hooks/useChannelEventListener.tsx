import { useEffect, useContext } from 'react'
import { PusherChannelContext } from '../context'

export const useChannelEventListener = (
  eventName: string, 
  eventCallback: (data: any) => void
): void => {
  const { channel } = useContext(PusherChannelContext)

  useEffect(
    () => {
      channel?.bind(eventName, eventCallback)

      return () => {
        channel?.unbind(eventName, eventCallback)
      }
    },
    [channel, eventName, eventCallback]
  )
}
