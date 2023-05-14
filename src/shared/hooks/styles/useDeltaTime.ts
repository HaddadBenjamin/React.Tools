import React from 'react';
import useOnFrameTimeChange from './useOnFrameTimeChange';

// Ex: deltaTime = useDeltaTime()
const useDeltaTime = () : number => {
  const [deltaTime, setDeltaTime] = React.useState(0);

  useOnFrameTimeChange((frameTime) => setDeltaTime((previousDeltaTime) => (previousDeltaTime + frameTime)));

  return deltaTime;
};

export default useDeltaTime;
