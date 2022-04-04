import React, { FC, useCallback } from "react";
import { mount } from "enzyme";
import {
  PusherProvider,
  PusherChannel,
  useChannelEventListener,
  useChannelEventTrigger,
  useConnectionStatus,
} from "../../src";

const MyComponent: FC<{ callback?: () => null }> = ({ callback }) => {
  useChannelEventListener(`CommentCreated`, callback);
  useConnectionStatus(`connected`, callback);
  const trigger = useChannelEventTrigger();
  const handleClick = useCallback(() => {
    trigger(`TestEvent`, { test: 1234 });
  }, [trigger]);
  return <button className="test" type="button" onClick={handleClick} />;
};

describe("<PusherProvider />", () => {
  let pusher, wrapper, unsubscribe, bind, unbind, trigger;

  beforeEach(() => {
    bind = jest.fn();
    unbind = jest.fn();
    trigger = jest.fn();
    unsubscribe = jest.fn();
    pusher = {
      subscribe: () => ({ bind, unbind, trigger }),
      unsubscribe,
      connection: {
        bind: jest.fn(),
        unbind: jest.fn(),
      },
    };
  });

  afterEach(() => {
    bind = null;
    unbind = null;
    unsubscribe = null;
    pusher = null;
    wrapper = null;
  });

  it(`should render`, () => {
    wrapper = mount(
      <PusherProvider instance={pusher}>
        <PusherChannel name="test">
          <MyComponent />
        </PusherChannel>
      </PusherProvider>
    );
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });

  it(`should unsubscribe channel on component will unmount event`, () => {
    wrapper = mount(
      <PusherProvider instance={pusher}>
        <PusherChannel name="test">
          <MyComponent />
        </PusherChannel>
      </PusherProvider>
    );
    expect(unsubscribe).not.toHaveBeenCalled();
    wrapper.unmount();
    expect(unsubscribe).toHaveBeenCalled();
  });

  it(`should call bind/unbind on channel when component mount/unmount`, () => {
    const myCallback = jest.fn();

    wrapper = mount(
      <PusherProvider instance={pusher}>
        <PusherChannel name="test">
          <MyComponent callback={myCallback} />
        </PusherChannel>
      </PusherProvider>
    );

    expect(unbind).not.toHaveBeenCalled();
    expect(bind).toHaveBeenCalled();
    expect(bind).toHaveBeenCalledWith(`CommentCreated`, myCallback);

    wrapper.unmount();

    expect(unbind).toHaveBeenCalled();
    expect(unbind).toHaveBeenCalledWith(`CommentCreated`, myCallback);
  });

  it(`should trigger fake event on click`, () => {
    wrapper = mount(
      <PusherProvider instance={pusher}>
        <PusherChannel name="test">
          <MyComponent />
        </PusherChannel>
      </PusherProvider>
    );

    wrapper.find(`.test`).first().simulate(`click`);

    expect(trigger).toHaveBeenCalled();
    expect(trigger).toHaveBeenCalledWith(`TestEvent`, { test: 1234 });
  });

  it(`should call bind/unbind on connection when component mount/unmount`, () => {
    const myCallback = jest.fn();

    wrapper = mount(
      <PusherProvider instance={pusher}>
        <PusherChannel name="test">
          <MyComponent callback={myCallback} />
        </PusherChannel>
      </PusherProvider>
    );

    expect(pusher.connection.unbind).not.toHaveBeenCalled();
    expect(pusher.connection.bind).toHaveBeenCalled();
    expect(pusher.connection.bind).toHaveBeenCalledWith(
      `connected`,
      myCallback
    );

    wrapper.unmount();

    expect(pusher.connection.unbind).toHaveBeenCalled();
    expect(pusher.connection.unbind).toHaveBeenCalledWith(
      `connected`,
      myCallback
    );
  });

  it("should not trigger fake event on click", () => {
    wrapper = mount(
      <PusherProvider instance={pusher}>
        <MyComponent />
      </PusherProvider>
    );

    wrapper.find(`.test`).first().simulate(`click`);

    expect(trigger).not.toHaveBeenCalled();
  });
});
