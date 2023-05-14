import { useEffect } from 'react';
import useUrlHash from './useUrlHash';
import pageOffset from '../../utilities/htmlElement/pageOffset';

// ex pour l'url https://toto#ancre =>
// smoothScroll = useSmoothAnchorFromUrlHash()
// <button onClick={smoothScroll}>gotoid ancre</button>
// <div id='ancre'/>
const useSmoothAnchorFromUrlHash = (topOffset = 0) : () => void => {
  const [urlHash] = useUrlHash();

  // eslint-disable-next-line no-undef,consistent-return
  const smoothAnchorScroll = () : NodeJS.Timeout| void => {
    if (urlHash) {
      const element = document?.querySelector(`#${urlHash}`);
      if (element) {
        const { leftPageOffset, topPageOffset } = pageOffset(element as HTMLElement);

        return setTimeout(() => window?.scrollTo({
          left: leftPageOffset,
          top: topPageOffset + topOffset,
          behavior: 'smooth',
        }), 100);
      }
    }
  };

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const timeoutId = smoothAnchorScroll();

    if (timeoutId) return () => clearTimeout(timeoutId);
  }, [urlHash]);

  return smoothAnchorScroll;
};

export default useSmoothAnchorFromUrlHash;
