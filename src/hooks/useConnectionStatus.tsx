import { useEffect, useContext } from 'react'
import { PusherContext } from '../context'

export const useConnectionStatus = (
  eventName: string, 
  eventCallback: (data: any) => void
): void => {
  const { pusher } = useContext(PusherContext)

  useEffect(
    () => {
      pusher?.connection.bind(eventName, eventCallback)

      return () => {
        pusher?.connection.unbind(eventName, eventCallback)
      }
    },
    [pusher, eventName, eventCallback]
  )
}
