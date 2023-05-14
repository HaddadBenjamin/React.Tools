import useWindowEvent from './useWindowEvent';

// Ex : useOnScroll((x) => console.log(x));
const useOnScroll = (callback: (pageYOffset: number) => void) : void => useWindowEvent('scroll', () => callback(window.scrollY));

export default useOnScroll;
