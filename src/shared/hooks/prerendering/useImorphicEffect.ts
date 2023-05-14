import {
  DependencyList, EffectCallback, useEffect, useLayoutEffect,
} from 'react';

// Ex : useIsomorphicEffect(() => console.log('Côté client sera un useEffect, côté serveur sera un useLayoutEffect')
const useIsomorphicEffect : (effect: EffectCallback, deps?: DependencyList) => void = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default useIsomorphicEffect;
