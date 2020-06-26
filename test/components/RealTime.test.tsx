import React, { useCallback } from 'react'
import { mount } from 'enzyme'
import {
  PusherProvider,
  PusherChannel,
  useChannelEventListener,
  useChannelEventTrigger,
  useConnectionStatus,
} from '../../src'

describe('<PusherProvider />', () => {
  let pusher, wrapper, unsubscribe, bind, unbind, trigger
  let MyComponent

  beforeEach(() => {
    bind = jest.fn()
    unbind = jest.fn()
    trigger = jest.fn()
    unsubscribe = jest.fn()
    pusher = {
      subscribe: () => ({ bind, unbind, trigger }),
      unsubscribe,
      connection: {
        bind: jest.fn(),
        unbind: jest.fn(),
      },
    }
    MyComponent = ({ callback }) => {
      useChannelEventListener(`CommentCreated`, callback)
      return (
        <span>Test</span>
      )
    }
  })

  afterEach(() => {
    bind = null
    unbind = null
    unsubscribe = null
    pusher = null
    wrapper = null
    MyComponent = null
  })

  it(`should render`, () => {
    wrapper = mount(
      <PusherProvider instance={pusher}>
        <PusherChannel name="test">
          <MyComponent />
        </PusherChannel>
      </PusherProvider>
    )
    expect(wrapper).toMatchSnapshot()
    wrapper.unmount()
  })

  it(`should unsubscribe channel on component will unmount event`, () => {
    wrapper = mount(
      <PusherProvider instance={pusher}>
        <PusherChannel name="test">
          <MyComponent />
        </PusherChannel>
      </PusherProvider>
    )
    expect(unsubscribe).not.toHaveBeenCalled()
    wrapper.unmount()
    expect(unsubscribe).toHaveBeenCalled()
  })

  it(`should call bind/unbind on channel when component mount/unmount`, () => {
    const myCallback = jest.fn()

    wrapper = mount(
      <PusherProvider instance={pusher}>
        <PusherChannel name="test">
          <MyComponent callback={myCallback}/>
        </PusherChannel>
      </PusherProvider>
    )

    expect(unbind).not.toHaveBeenCalled()
    expect(bind).toHaveBeenCalled()
    expect(bind).toHaveBeenCalledWith(`CommentCreated`, myCallback)

    wrapper.unmount()

    expect(unbind).toHaveBeenCalled()
    expect(unbind).toHaveBeenCalledWith(`CommentCreated`, myCallback)
  })

  it(`should trigger fake event on click`, () => {
    MyComponent = () => {
      const trigger = useChannelEventTrigger()
      const handleClick = useCallback(() => {
        trigger(`TestEvent`, { test: 1234 })
      }, [trigger])
      return (
        <button className="test" type="button" onClick={handleClick} />
      )
    }

    wrapper = mount(
      <PusherProvider instance={pusher}>
        <PusherChannel name="test">
          <MyComponent />
        </PusherChannel>
      </PusherProvider>
    )

    wrapper.find(`.test`).first().simulate(`click`)

    expect(trigger).toHaveBeenCalled()
    expect(trigger).toHaveBeenCalledWith(`TestEvent`, { test: 1234 })
  })

  it(`should call bind/unbind on connection when component mount/unmount`, () => {
    MyComponent = ({ callback }) => {
      useConnectionStatus(`connected`, callback)
      return (<span>Test</span>)
    }

    const myCallback = jest.fn()

    wrapper = mount(
      <PusherProvider instance={pusher}>
        <PusherChannel name="test">
          <MyComponent callback={myCallback} />
        </PusherChannel>
      </PusherProvider>
    )

    expect(pusher.connection.unbind).not.toHaveBeenCalled()
    expect(pusher.connection.bind).toHaveBeenCalled()
    expect(pusher.connection.bind).toHaveBeenCalledWith(`connected`, myCallback)

    wrapper.unmount()

    expect(pusher.connection.unbind).toHaveBeenCalled()
    expect(pusher.connection.unbind).toHaveBeenCalledWith(`connected`, myCallback)
  })
})
