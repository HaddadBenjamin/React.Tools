import { type MutableRefObject, useEffect } from 'react';

const useEventListener = <T extends HTMLElement>(
  eventName: string,
  eventHandler: (event: Event) => void,
  reference: MutableRefObject<T | null> | Document | Window,
): void => {
  useEffect(() => {
    const targetElement = reference instanceof Window || reference instanceof Document
      ? reference
      : reference.current;

    targetElement?.addEventListener(eventName, eventHandler);

    return () => {
      targetElement?.removeEventListener(eventName, eventHandler);
    };
  }, [eventName, eventHandler, reference]);
};

export default useEventListener;
