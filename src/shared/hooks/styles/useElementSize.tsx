import { useEffect, useRef, useState, RefObject } from 'react';

type ElementSize = {
  width: number;
  height: number;
};

type UseElementSizeParams = {
  selector?: string;
  ref?: RefObject<HTMLElement>;
  onChange?: (parameters: ElementSize & { element: HTMLElement }) => void;
};

const useElementSize = ({
  selector,
  ref,
  onChange
}: UseElementSizeParams): ElementSize => {
  const [size, setSize] = useState<ElementSize>({ width: 0, height: 0 });
  const observerRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    let element: HTMLElement | null = null;

    if (ref && ref.current) {
      element = ref.current;
    } else if (selector) {
      element = document.querySelector<HTMLElement>(selector);
    }

    if (!element) {
      console.warn('No element found for useElementSize');
      return;
    }

    const updateSize = () => {
      const newSize = {
        width: element!.offsetWidth,
        height: element!.offsetHeight
      };
      setSize(newSize);
      onChange?.({ ...newSize, element });
    };

    observerRef.current = new ResizeObserver(updateSize);
    observerRef.current.observe(element);
    updateSize();

    return () => {
      observerRef.current?.disconnect();
    };
  }, [selector, ref, onChange]);

  return size;
};

export default useElementSize;
