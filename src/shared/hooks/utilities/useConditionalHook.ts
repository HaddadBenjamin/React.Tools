import { useEffect } from 'react';

// Example : useConditionalHook(condition, () => useGetRefreshTokenWhenTokenHasExpired());
const useConditionalHook = (enabled : boolean, onEnabled: () => void) : void => {
  useEffect(() => { if (enabled) onEnabled(); }, [enabled]);
};

export default useConditionalHook;
