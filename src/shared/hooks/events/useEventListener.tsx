import { MutableRefObject, useEffect } from 'react';

const useEventListener = <T extends HTMLElement>(
  eventName : string,
  eventHandler : (event: Event) => void,
  reference : MutableRefObject<T>) : void => {
  useEffect(() => {
    reference?.current?.addEventListener(eventName, eventHandler);

    return () => reference?.current?.removeEventListener(eventName, eventHandler);
  },
  [reference?.current]);
};

export default useEventListener;
