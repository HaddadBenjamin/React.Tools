import { useState } from 'react';
import useOnFrameTimeChange from './useOnFrameTimeChange';

// Ex: frameTime = useFrameTime()
const useFrameTime = () : number => {
  const [frameTime, setFrameTime] = useState(0);

  useOnFrameTimeChange(setFrameTime);

  return frameTime;
};

export default useFrameTime;
