import { MutableRefObject, useEffect, useState } from 'react';

interface IUseOnVisibleChangeParameters<THtmlElement extends HTMLElement> {
  ref: MutableRefObject<THtmlElement>,
  stopToObserveWhenElementIsVisible?: boolean,
  // 50: l'élément sera marqué comme visible 50px avant qu'il soit visible
  // -100 : l'élément sera marqué comme visible 100px après qu'il soit visible
  offset?: number
}
const useOnVisibleChange = <THtmlElement extends HTMLElement>(
  {
    ref,
    stopToObserveWhenElementIsVisible = true,
    offset = 50,
  } : IUseOnVisibleChangeParameters<THtmlElement>): boolean => {
  const [isVisible, setIsVisible] = useState(false);

  const intersectionObserverCallback = (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver,
  ): void => entries.forEach((entry) => {
    const elementIsVisible = entry.isIntersecting || entry.intersectionRatio > 0;

    if (elementIsVisible) {
      if (stopToObserveWhenElementIsVisible) observer.unobserve(entry.target);
      setIsVisible(true);
    } else setIsVisible(false);
  });

  useEffect(() => {
    if (!ref.current) return;

    const intersectionObserver = new IntersectionObserver(
      intersectionObserverCallback,
      {
        rootMargin: `${offset}px`,
        threshold: 0.01,
      },
    );

    intersectionObserver.observe(ref.current);

    return (): void => {// eslint-disable-line
      if (ref.current) intersectionObserver.unobserve(ref.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isVisible;
};

export default useOnVisibleChange;
