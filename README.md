# React-Pusher

[![Build Status](https://travis-ci.org/petarslavnic/react-pusher.svg?branch=master)](https://travis-ci.org/petarslavnic/react-pusher)
[![codecov](https://codecov.io/gh/petarslavnic/react-pusher/branch/master/graph/badge.svg)](https://codecov.io/gh/petarslavnic/react-pusher)
[![npm version](https://badge.fury.io/js/react-pusher.svg)](https://badge.fury.io/js/react-pusher)

Set of components which provides easy integration Pusher like notification service into your React application.


## Installation

React Realtime requires **React 16.8.0 or later.**

```
npm i @petarslavnic/react-pusher
```

OR

```
yarn add @petarslavnic/react-pusher
```

## Usage

All components and functions are available on the top-level export.

```js
import {
  PusherProvider,
  PusherChannel,
  useChannelEventListener,
  useChannelEventTrigger,
  useConnectionStatus,
} from '@petarslavnic/react-pusher'
```

#### Pusher example:
In that case, we need pusher client library. You can find it [here](https://github.com/pusher/pusher-js).

Channel event listener example:
```js
import React, { useState, useCallback } from 'react'
import { useChannelEventListener } from '@petarslavnic/react-pusher'

const MyComponent = () => {
  const [name, setName] = useState('')
  const onMyEventCallback = useCallback(data => {
    // do something with real-time data
    // for example set username
    const { name } = data
    setName(name)
  }, [])

  useChannelEventListener('user-updated-event', onMyEventCallback)

  return <span>{`User: ${name}`}</span>
}
```

Channel event trigger example:
```js
import React, { useMemo, useCallback } from 'react'
import { useChannelEventTrigger } from '@petarslavnic/react-pusher'

const MyComponent = () => {
  const data = useMemo(() => {
    // for example return empty object
    return {}
  }, [])
  const trigger = useChannelEventTrigger()
  const handleClick = useCallback(() => {
    trigger('client-my-event', data)
  }, [])

  return <span onClick={handleClick}>My Component</span>
}
```

Connection event listener example:
```js
import React, { useState, useCallback } from 'react'
import { useConnectionStatus } from '@petarslavnic/react-pusher'

const MyComponent = () => {
  const [status, setStatus] = useState('connected')
  const onStateChange = useCallback(status => {
    setStatus(status)
  }, [])

  useConnectionStatus('state_change', onStateChange)

  return <span>{`Connection status: ${status}`}</span>
}
```

Use MyComponent inside appropriate channel
```js
import React from 'react'
import Pusher from 'pusher-js'
import { PusherProvider, PusherChannel } from '@petarslavnic/react-pusher'

// Use your own APP_KEY and APP_CLUSTER from pusher account
const pusher = new Pusher(APP_KEY, {
  cluster: APP_CLUSTER
});

const App = () => {
  return (
    <PusherProvider connector={pusher}>
      <PusherChannel name="my-channel">
        <MyComponent />
      </PusherChannel>
    </PusherProvider>
  )
}

```
Trigger an event from debug console inside pusher dashboard and watch how username appears in your app.

## License

MIT
