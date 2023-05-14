import React from 'react';

export default (): number => {
  const ref = React.useRef(1);

  React.useEffect(() => { ref.current += 1; });

  return ref.current;
};
