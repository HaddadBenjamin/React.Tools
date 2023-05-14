import React from 'react';
import styles from './ThrottleAndDebounce.module.scss';
import useThrottleState from '../../shared/hooks/state/useThrottleState';
import useDebounceValue from '../../shared/hooks/performance/useDebounceValue';

const ThrottleAndDebounceSample = () => {
  const [value, setValue, throttleValue] = useThrottleState('');
  const debounceValue = useDebounceValue(value); // on aurait pu également faire un useDebounceState
  const useDefferedValue = useDebounceValue(value, 100); // on aurait pu également faire un useDebounceState

  return (
    <div>
      <h2>Throttle VS Debounce : use[Throttle|Debounce]State</h2>

      <div className={styles.container}>
        <div>
          {'Value: '}
          <input type='text' value={value} onChange={(e) => setValue(e.target.value)} placeholder='value without throttle or debounce' />
          {' - Par défault la fonction est appelé à chaque modification.'}
          <div>{`Throttle: ${throttleValue} - Limite l'appel de la fonction une fois tout les n temps.`}</div>
          <div>{`Debounce: ${debounceValue} - Apelle la fonction qu'une fois à la fin des actions de l'utilisateur.`}</div>
          <div>{`useDefferedValue: ${useDefferedValue} - Equivalent à un debounce de 100ms, voir mes notes.`}</div>
        </div>
      </div>
    </div>
  );
};

export default ThrottleAndDebounceSample;
