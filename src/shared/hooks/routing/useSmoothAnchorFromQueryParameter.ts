import { useEffect } from 'react';
import useQueryParameter from './useQueryParameter';
import pageOffset from '../../utilities/htmlElement/pageOffset';

// ex pour l'url https://toto?ancre=test =>
// smoothScroll = useSmoothAnchorFromQueryParameter('ancre')
// <button onClick={smoothScroll}>gotoid ancre</button>
// <div id='test'/>
const useSmoothAnchorFromQueryParameter = (queryParameterName: string, topOffset = 0) : () => void => {
  const queryParameter = useQueryParameter(queryParameterName);

  // eslint-disable-next-line no-undef,consistent-return
  const smoothAnchorScroll = () : NodeJS.Timeout| void => {
    if (queryParameter) {
      const element = document?.querySelector(`#${queryParameter}`);

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
  }, [queryParameter]);

  return smoothAnchorScroll;
};

export default useSmoothAnchorFromQueryParameter;
