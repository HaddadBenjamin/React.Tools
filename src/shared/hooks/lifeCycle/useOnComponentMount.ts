import { useEffect } from 'react';

const useOnComponentMount = (callback: () => void) : void => useEffect(callback, []);

export default useOnComponentMount;
