/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useMemo } from 'react';
import useSharedSessionStorage from '../state/useSharedSessionStorage';

const MILLISECONDS_IN_ONE_MINUTE = 60000;

interface IIdleState {
  isIdle : boolean,
  secondsToBeIdle : number,
  secondsToBeConsideredAsIdle : number
}

// Optimisation possible : passer en paramètre un throttleValue, valeur par défault = 300, mais créera une dépendance à Lodash.
const useIdle = (minutesToBeIdle : number) : boolean => {
  // window is not defined using server side rendering
  if (typeof window === 'undefined') return false;

  const secondsToBeConsideredAsIdle = useMemo(() => (MILLISECONDS_IN_ONE_MINUTE * minutesToBeIdle) / 1000, [minutesToBeIdle]);
  const [idleState, setIdleState] = useSharedSessionStorage('idleState', {
    secondsToBeIdle: 0,
    isIdle: false,
    secondsToBeConsideredAsIdle,
  } as IIdleState);

  const updateIdleState = () => {
    const isIdle = idleState.secondsToBeIdle >= secondsToBeConsideredAsIdle;

    setIdleState({
      // eslint-disable-next-line  @typescript-eslint/restrict-plus-operands
      secondsToBeIdle: idleState.secondsToBeIdle + 1,
      isIdle,
      secondsToBeConsideredAsIdle,
    });
  };

  useEffect(() => {
    const idleInterval = setInterval(updateIdleState, 1000);

    const onActive = () => setIdleState({
      isIdle: false,
      secondsToBeIdle: 0,
      secondsToBeConsideredAsIdle,
    });

    const events = [
      'mousedown',
      'click',
      'keypress',
      // On pourrait rajouter lse évènements 'move', 'scroll' mais on va éviter de sorte à ne pas surcharger les rendus.
    ];

    // Fonctionne en SSR car le composant est monté à ce moment
    events.forEach((event) => window.addEventListener(event, onActive));

    return () => {
      clearInterval(idleInterval);

      events.forEach((event) => window.removeEventListener(event, onActive));
    };
  }, []);

  return idleState.isIdle;
};

export default useIdle;
