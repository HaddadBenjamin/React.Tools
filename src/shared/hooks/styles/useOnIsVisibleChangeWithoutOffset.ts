import { MutableRefObject, useEffect, useState } from 'react';

const useOnVisibleChangeWithoutOffset = <THtmlElement extends HTMLElement>(ref: MutableRefObject<THtmlElement>): boolean => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    (new IntersectionObserver((entries) => entries.forEach((entry) => setIsVisible(entry.isIntersecting)))
    ).observe(ref.current);
  }, []);

  return isVisible;
};

export default useOnVisibleChangeWithoutOffset;
